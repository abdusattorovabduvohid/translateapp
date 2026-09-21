import { useCallback, useState } from "react";

/**
 * localStorage'dagi qiymat. Brauzer taqiqlasa ham yiqilmaydi —
 * shunchaki xotirada ishlaydi.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          /* xotira to'la yoki taqiqlangan — muammo emas */
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, update] as const;
}
