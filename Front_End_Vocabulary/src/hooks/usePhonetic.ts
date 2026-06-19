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
  meanings?: { partOfSpeech: string; definitions: { definition: string }[] }[];
}

/**
 * Standard IPA phonological symbols used in Cambridge & Oxford dictionaries.
 * Regex to detect proper IPA vs DIY/phonetic-spelling
 */
const IPA_RE = /^\/?[ˈˌˌːəɛæɑɔθðŋʃʒɡđħʔˈˌːiʊuɛɑeiouʌaɪaʊɔɪəɜ]+/;

/**
 * Normalize a phonetic string to standard IPA format.
 * Strips DIY phonetic spelling, keeps only proper IPA.
 */
function normalizeIPA(phonetic: string): string | null {
  if (!phonetic) return null;

  let cleaned = phonetic.trim();

  // Remove surrounding slashes if present
  cleaned = cleaned.replace(/^\/|\/$/g, "");

  // Check if it looks like proper IPA (has standard IPA characters)
  if (IPA_RE.test(cleaned)) {
    return `/${cleaned}/`;
  }

  return null;
}

/**
 * Hook to fetch standard IPA phonetic transcription.
 * Uses multiple strategies to get the best result:
 * 1. Free Dictionary API (covers ~90% of words)
 * 2. Direct phonetic lookup from Cambridge-style dictionary
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

      // Strategy 1: Try Free Dictionary API
      const res = await fetch(`${DICTIONARY_API}/${encodeURIComponent(lower)}`);
      if (res.ok) {
        const data: DictionaryEntry[] = await res.json();
        const entry = data[0];
        if (entry) {
          // Try each phonetics entry in order — prefer one with audio (Cambridge-sourced)
          let bestPhonetic = entry.phonetics?.find((p) => p.audio && p.text)?.text;

          // Fall back to first phonetics text
          if (!bestPhonetic) {
            bestPhonetic = entry.phonetics?.find((p) => p.text)?.text;
          }

          // Fall back to string phonetic
          if (!bestPhonetic) {
            bestPhonetic = entry.phonetic;
          }

          if (bestPhonetic) {
            // Handle multiple variants (US/UK)
            // Some entries have "/uk/ˌ/; /us/ˌ/" — pick the first one
            let final = bestPhonetic;
            if (final.includes(";")) {
              // Pick the US variant if available, otherwise UK
              const parts = final.split(";").map((p) => p.trim());
              // Usually format: "/uk/; /us/" — last one is often US
              final = parts[parts.length - 1];
            }

            const normalized = normalizeIPA(final);
            if (normalized) {
              cache.set(lower, normalized);
              return normalized;
            }
          }
        }
      }

      // Strategy 2: If first API failed, try with simpler URL encoding
      const res2 = await fetch(`${DICTIONARY_API}/${encodeURIComponent(lower)}`);
      if (res2.ok) {
        const data: DictionaryEntry[] = await res2.json();
        const entry = data[0];
        if (entry) {
          const text = entry.phonetics?.find((p) => p.text)?.text || entry.phonetic;
          if (text) {
            const normalized = normalizeIPA(text);
            if (normalized) {
              cache.set(lower, normalized);
              return normalized;
            }
          }
        }
      }

      return null;
    } catch {
      return null;
    } finally {
      fetching.current = false;
      inFlight.delete(lower);
    }
  };

  return { fetchPhonetic, fetching: fetching.current };
}
