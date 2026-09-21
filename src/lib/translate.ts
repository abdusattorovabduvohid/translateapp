import { getSample, type SampleFn } from "./claude";
import type { Direction, Translation } from "./types";

/** VPN'da so'rov osilib qolmasligi uchun chek */
const NET_TIMEOUT_MS = 9000;

/** Tashqi signalni ham, vaqt chekini ham birlashtiradi */
function timedSignal(outer?: AbortSignal) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), NET_TIMEOUT_MS);

  if (outer) {
    if (outer.aborted) controller.abort();
    else outer.addEventListener("abort", () => controller.abort(), { once: true });
  }

  return { signal: controller.signal, clear: () => clearTimeout(timer) };
}

function buildPrompt(text: string, direction: Direction): string {
  if (direction === "ru-uz") {
    return [
      "You are translating for an Uzbek speaker who lives and works in Moscow and needs to understand Russian.",
      "Translate the Russian text below into natural, everyday Uzbek (Latin script) that an Uzbek speaker would actually say.",
      "Keep it short and idiomatic, not word-for-word.",
      'Reply with ONLY a JSON object: {"uz": "...", "ru": "..."} where "uz" is the Uzbek translation and "ru" is the Russian text, cleaned up and properly punctuated.',
      'Example: {"uz": "bu qancha turadi?", "ru": "Сколько это стоит?"}',
      "",
      `Russian text: ${text}`,
    ].join("\n");
  }

  return [
    "You are translating for an Uzbek speaker who lives and works in Moscow.",
    "Translate the Uzbek text below into natural, polite, everyday Russian that a real person would say in Moscow.",
    'Use the polite "вы" form unless the text is clearly addressed to a close friend or child.',
    "Keep it short and idiomatic, not word-for-word. Russian must be in Cyrillic.",
    "Then give a short back-translation of YOUR Russian into Uzbek (Latin script, lowercase).",
    'Reply with ONLY a JSON object: {"ru": "...", "uz": "..."}',
    'Example: {"ru": "Сколько это стоит?", "uz": "bu qancha turadi?"}',
    "",
    `Uzbek text: ${text}`,
  ].join("\n");
}

/** Javobdagi bo'sh tomonni kiritilgan matn bilan to'ldiradi */
function settle(
  data: { ru?: string; uz?: string },
  text: string,
  direction: Direction,
  source: Translation["source"],
): Translation {
  const ru = (data.ru ?? "").trim();
  const uz = (data.uz ?? "").trim();

  if (direction === "uz-ru") {
    if (!ru) throw { code: "empty_completion" };
    return { ru, uz: uz || text.toLowerCase(), direction, source };
  }

  if (!uz) throw { code: "empty_completion" };
  return { ru: ru || text.trim(), uz, direction, source };
}

/** claude.ai ichidagi tarjima */
export async function viaClaude(
  sample: SampleFn,
  text: string,
  direction: Direction,
  outer?: AbortSignal,
): Promise<Translation> {
  const t = timedSignal(outer);
  try {
    const data = await sample.json<{ ru?: string; uz?: string }>(
      buildPrompt(text, direction),
      { modelTier: "quick", signal: t.signal },
    );
    return settle(data ?? {}, text, direction, "ai");
  } finally {
    t.clear();
  }
}

/** Vercel'dagi o'z serverimiz (ANTHROPIC_API_KEY qo'yilgan bo'lsa) */
export async function viaServer(
  text: string,
  direction: Direction,
  outer?: AbortSignal,
): Promise<Translation> {
  const t = timedSignal(outer);
  try {
    const res = await fetch("api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, direction }),
      signal: t.signal,
    });
    if (!res.ok) throw new Error(`server ${res.status}`);
    const data = (await res.json()) as { ru?: string; uz?: string };
    return settle(data ?? {}, text, direction, "api");
  } finally {
    t.clear();
  }
}

/** Bepul ommaviy tarjima xizmati — oxirgi onlayn chora */
export async function viaWeb(
  text: string,
  direction: Direction,
  outer?: AbortSignal,
): Promise<Translation> {
  const t = timedSignal(outer);
  try {
    const pair = direction === "uz-ru" ? "uz|ru" : "ru|uz";
    const url = `https://api.mymemory.translated.net/get?langpair=${pair}&q=${encodeURIComponent(text)}`;
    const res = await fetch(url, { signal: t.signal });
    if (!res.ok) throw new Error(`web ${res.status}`);

    const data = (await res.json()) as { responseData?: { translatedText?: string } };
    const got = data.responseData?.translatedText?.trim();
    if (!got || /^NO QUERY|INVALID|MYMEMORY WARNING/i.test(got)) throw new Error("web empty");

    return direction === "uz-ru"
      ? { ru: got, uz: text.toLowerCase(), direction, source: "web" }
      : { ru: text.trim(), uz: got.toLowerCase(), direction, source: "web" };
  } finally {
    t.clear();
  }
}

/**
 * Onlayn zanjir: Claude → o'z serverimiz → bepul xizmat.
 * Birinchi ishlagani qaytadi; hammasi yiqilsa xatoni tashlaydi.
 */
export async function translateOnline(
  text: string,
  direction: Direction,
  outer?: AbortSignal,
): Promise<Translation> {
  const sample = await getSample();

  const steps: Array<() => Promise<Translation>> = sample
    ? [() => viaClaude(sample, text, direction, outer)]
    : [() => viaServer(text, direction, outer), () => viaWeb(text, direction, outer)];

  let last: unknown = { code: "offline" };
  for (const step of steps) {
    try {
      return await step();
    } catch (err) {
      if (outer?.aborted) throw { code: "cancelled" };
      last = isAbort(err) ? { code: "slow" } : err;
    }
  }
  throw last;
}

function isAbort(err: unknown): boolean {
  if (err instanceof DOMException && err.name === "AbortError") return true;
  return typeof err === "object" && err !== null && "code" in err && err.code === "cancelled";
}

export function errorCode(err: unknown): string {
  if (typeof err === "object" && err !== null && "code" in err) {
    return String((err as { code: unknown }).code);
  }
  return "offline";
}
