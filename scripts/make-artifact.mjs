/**
 * dist/index.html dan claude.ai artefakti uchun variant tayyorlaydi.
 *
 * Artefakt sahifasi <!doctype>, <html>, <head>, <body> teglarini o'zi qo'shadi,
 * shuning uchun ularni olib tashlab, faqat ichki qismini qoldiramiz.
 * Vercel uchun dist/index.html o'zgarmaydi.
 */
import { readFile, writeFile } from "node:fs/promises";

const SOURCE = "dist/index.html";
const TARGET = "dist/artifact.html";

const html = await readFile(SOURCE, "utf8");

const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";
const body = html.match(/<body>([\s\S]*?)<\/body>/i)?.[1] ?? "";

// charset va viewport'ni artefakt qobig'i o'zi qo'yadi.
const headKept = head
  .split("\n")
  .filter((line) => !/<meta\s+charset|name="viewport"/i.test(line))
  .join("\n")
  .trim();

await writeFile(TARGET, `${headKept}\n${body.trim()}\n`, "utf8");

console.log(`${TARGET} tayyor (${headKept.length + body.length} bayt)`);
