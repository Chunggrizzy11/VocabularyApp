import { useRef } from "react";

const cache = new Map<string, string>();
const inFlight = new Set<string>();

const DICTIONARY_API = "https://api.dictionaryapi.dev/api/v2/entries/en";

interface PhoneticEntry {
  text?: string;
  audio?: string;
}

interface DictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics?: PhoneticEntry[];
}

/**
 * Hook to fetch standard IPA phonetic transcription from Free Dictionary API.
 * Caches results so repeated lookups are instant.
 */
export function usePhonetic() {
  const fetching = useRef(false);

  const fetchPhonetic = async (word: string): Promise<string | null> => {
    const lower = word.toLowerCase().trim();
    if (!lower) return null;

    const cached = cache.get(lower);
    if (cached) return cached;
    if (inFlight.has(lower)) return null;

    inFlight.add(lower);
    try {
      fetching.current = true;
      const res = await fetch(`${DICTIONARY_API}/${encodeURIComponent(lower)}`);
      if (!res.ok) return null;

      const data: DictionaryEntry[] = await res.json();
      const entry = data[0];
      if (!entry) return null;

      // Prefer phonetic from phonetics array, fall back to string phonetic
      let phonetic = entry.phonetics?.find((p) => p.text)?.text || entry.phonetic || "";

      // Clean up: remove stress marks duplicates, keep standard IPA
      // Some API responses return multiple phonetics separated by commas
      if (phonetic.includes(",")) {
        phonetic = phonetic.split(",")[0].trim();
      }

      cache.set(lower, phonetic);
      return phonetic || null;
    } catch {
      return null;
    } finally {
      fetching.current = false;
      inFlight.delete(lower);
    }
  };

  return { fetchPhonetic, fetching: fetching.current };
}
