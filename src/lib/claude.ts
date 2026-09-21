/**
 * claude.ai ichida ochilganda sahifa Claude'dan tarjima so'ray oladi.
 * Boshqa joyda (Vercel, telefon) bu yo'q — o'shanda null qaytadi.
 */

export interface SampleOptions {
  modelTier?: "quick" | "default" | "complex";
  signal?: AbortSignal;
}

export interface SampleFn {
  (input: string, options?: SampleOptions): Promise<{ text: string; truncated: boolean }>;
  json<T>(input: string, options?: SampleOptions): Promise<T>;
}

export interface SampleError {
  code: string;
  message?: string;
  text?: string;
}

declare global {
  interface Window {
    claude?: { use(name: string): Promise<unknown> };
  }
}

export const IN_ARTIFACT =
  typeof window !== "undefined" && typeof window.claude?.use === "function";

let cached: Promise<SampleFn | null> | null = null;

export function getSample(): Promise<SampleFn | null> {
  if (!IN_ARTIFACT) return Promise.resolve(null);
  cached ??= window
    .claude!.use("sample")
    .then((fn) => (typeof fn === "function" ? (fn as SampleFn) : null))
    .catch(() => null);
  return cached;
}

/** Xizmat butunlay yopilgan bo'lsa qayta so'ramaymiz */
export function dropSample(): void {
  cached = Promise.resolve(null);
}
