// Vercel serverless funksiyasi: o'zbekcha matnni ruschaga tarjima qiladi.
//
// Ishlashi uchun Vercel loyihasida ANTHROPIC_API_KEY muhit o'zgaruvchisi
// (Environment Variable) qo'yilgan bo'lishi kerak. Kalit qo'yilmagan bo'lsa,
// funksiya 501 qaytaradi va sahifa avtomatik oddiy tarjimaga o'tadi.

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // ANTHROPIC_API_KEY muhitdan olinadi

const SYSTEM = [
  "You translate for an Uzbek speaker who lives and works in Moscow.",
  "Translate the user's Uzbek text into natural, polite, everyday Russian that a real person would say in Moscow.",
  'Use the polite "вы" form unless the text is clearly addressed to a close friend or child.',
  "Keep it short and idiomatic, not word-for-word. Russian must be in Cyrillic.",
  "Then give a short back-translation of YOUR Russian into Uzbek (Latin script, lowercase).",
  'Reply with ONLY a JSON object: {"ru": "...", "uz": "..."}',
  'Example: {"ru": "Сколько это стоит?", "uz": "bu qancha turadi?"}',
].join("\n");

function extractJson(raw) {
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = fence ? fence[1] : raw;
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(body.slice(start, end + 1));
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(501).json({ error: "no_api_key" });
    return;
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body;
  const text = String(body?.text ?? "").trim().slice(0, 600);
  if (!text) {
    res.status(400).json({ error: "empty_text" });
    return;
  }

  try {
    const message = await client.beta.messages.create({
      model: "claude-opus-5",
      max_tokens: 1000,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM,
      messages: [{ role: "user", content: text }],
    });

    if (message.stop_reason === "refusal") {
      res.status(422).json({ error: "refused" });
      return;
    }

    const raw = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    const data = extractJson(raw);
    if (!data?.ru) {
      res.status(502).json({ error: "unparsable", raw });
      return;
    }

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ ru: String(data.ru).trim(), uz: String(data.uz ?? "").trim() });
  } catch (err) {
    const status = typeof err?.status === "number" ? err.status : 502;
    res.status(status >= 400 && status < 600 ? status : 502).json({
      error: "upstream_error",
      message: err?.message ?? "unknown",
    });
  }
}

function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
