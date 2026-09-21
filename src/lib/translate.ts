import { getSample, type SampleFn } from "./claude";
import type { Translation } from "./types";

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

function buildPrompt(text: string): string {
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

/** claude.ai ichidagi tarjima */
export async function viaClaude(
  sample: SampleFn,
  text: string,
  outer?: AbortSignal,
): Promise<Translation> {
  const t = timedSignal(outer);
  try {
    const data = await sample.json<{ ru?: string; uz?: string }>(buildPrompt(text), {
      modelTier: "quick",
      signal: t.signal,
    });
    if (!data?.ru) throw { code: "empty_completion" };
    return { ru: data.ru.trim(), uz: (data.uz ?? "").trim(), source: "ai" };
  } finally {
    t.clear();
  }
}

/** Vercel'dagi o'z serverimiz (ANTHROPIC_API_KEY qo'yilgan bo'lsa) */
export async function viaServer(text: string, outer?: AbortSignal): Promise<Translation> {
  const t = timedSignal(outer);
  try {
    const res = await fetch("api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      signal: t.signal,
    });
    if (!res.ok) throw new Error(`server ${res.status}`);
    const data = (await res.json()) as { ru?: string; uz?: string };
    if (!data?.ru) throw new Error("server empty");
    return { ru: data.ru.trim(), uz: (data.uz ?? "").trim(), source: "api" };
  } finally {
    t.clear();
  }
}

/** Bepul ommaviy tarjima xizmati — oxirgi onlayn chora */
export async function viaWeb(text: string, outer?: AbortSignal): Promise<Translation> {
  const t = timedSignal(outer);
  try {
    const url = `https://api.mymemory.translated.net/get?langpair=uz|ru&q=${encodeURIComponent(text)}`;
    const res = await fetch(url, { signal: t.signal });
    if (!res.ok) throw new Error(`web ${res.status}`);
    const data = (await res.json()) as { responseData?: { translatedText?: string } };
    const ru = data.responseData?.translatedText;
    if (!ru || /^NO QUERY|INVALID|MYMEMORY WARNING/i.test(ru)) throw new Error("web empty");
    return { ru: ru.trim(), uz: text.toLowerCase(), source: "web" };
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
  outer?: AbortSignal,
): Promise<Translation> {
  const sample = await getSample();
  const steps: Array<() => Promise<Translation>> = [];

  if (sample) steps.push(() => viaClaude(sample, text, outer));
  if (!sample) {
    steps.push(() => viaServer(text, outer));
    steps.push(() => viaWeb(text, outer));
  }

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
