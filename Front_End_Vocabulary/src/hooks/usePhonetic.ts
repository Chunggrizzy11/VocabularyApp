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

/** Detect DIY phonetics like /good-bī/, /CHik-in/ — NOT real IPA */
const DIY_RE = /^\/?[a-zA-Z].*[a-zA-Z].*\/?$/;

/**
 * Returns true if the string contains IPA-specific characters
 * that mark it as a real IPA transcription (not DIY spelling).
 */
function hasIpaChars(s: string): boolean {
  return /[ˈˌːəɛæɑɔθðŋʃʒɡ]/.test(s);
}

/**
 * Clean and normalize IPA from the Free Dictionary API.
 * Returns null if it's not real IPA.
 */
function normalizeIPA(phonetic: string): string | null {
  if (!phonetic) return null;

  let cleaned = phonetic.trim();
  // Remove surrounding slashes
  cleaned = cleaned.replace(/^\/|\/$/g, "").trim();
  if (!cleaned) return null;

  // Reject if it looks like DIY phonetic spelling
  if (DIY_RE.test(cleaned) && !hasIpaChars(cleaned)) return null;

  // Must have at least one IPA-specific char
  if (!hasIpaChars(cleaned)) return null;

  return `/${cleaned}/`;
}

/**
 * Fetch standard IPA from Free Dictionary API (Cambridge/Wiktionary source).
 * Caches results for instant repeat lookups.
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

      // Prefer UK IPA (has ː marks, more standard).
      // The API puts UK first (no audio or with UK audio), US second.
      // US entries use /ɚ/ (rhotic) and lack ː marks — less standard.
      let best = entry.phonetics?.find((p) => p.text && hasIpaChars(p.text))?.text;
      if (!best) best = entry.phonetics?.find((p) => p.text)?.text;
      if (!best) best = entry.phonetic;
      if (!best) return null;

      // Handle "UK: /xx/; US: /yy/" — pick the last variant (usually US)
      if (best.includes(";")) {
        const parts = best.split(";").map((s) => s.trim());
        best = parts[parts.length - 1];
      }

      const normalized = normalizeIPA(best);
      if (normalized) {
        cache.set(lower, normalized);
        return normalized;
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
