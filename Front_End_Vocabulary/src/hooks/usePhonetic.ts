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
 */
const IPA_RE = /^\/?[ˈˌːəɛæɑɔθðŋʃʒɡđħʔiʊuɛɑeiouʌaɪaʊɔɪəɜ]+/;

/**
 * Add syllable dots (·) to IPA notation in Cambridge-style format.
 *
 * Cambridge format: ˈjuː.nɪ.fɔːm  (with dots between syllables)
 * API returns:      ˈjuːnɪfɔːm    (no dots)
 *
 * Syllable boundary rules in English IPA:
 * - Between two consonants that form separate syllables
 * - Before a stressed syllable
 * - After /ˈ/ stress marks, before the vowel
 */
function addSyllableDots(ipa: string): string {
  // Don't add dots if they already exist
  if (ipa.includes(".")) return ipa;

  // Remove slashes temporarily for processing
  const hasSlashes = ipa.startsWith("/") && ipa.endsWith("/");
  let inner = hasSlashes ? ipa.slice(1, -1).trim() : ipa.trim();
  if (!inner) return ipa;

  // Insert dots between consonant clusters where there's no vowel in between
  // Vowel set for IPA: iː, ɪ, e, æ, ɑː, ɒ, ɔː, uː, ʊ, ʌ, ɜː, ə, aɪ, aʊ, ɔɪ, eɪ, oʊ, ɪə, eə, ʊə
  // Strategy: add dot after each vowel+syllable boundary

  const result: string[] = [];
  let i = 0;
  const chars = [...inner];

  while (i < chars.length) {
    result.push(chars[i]);

    // Check if current char is a vowel that could end a syllable
    const c = chars[i];
    const next = i + 1 < chars.length ? chars[i + 1] : null;

    // Vowel characters in IPA
    const isVowel = /[iɪeɛæɑɒɔuʊʌəɜaoe]/.test(c);
    const isStress = c === "ˈ" || c === "ˌ";

    // If next char is a stress marker, that's a syllable boundary
    if (next && isStress) {
      result.push(".");
    }
    // If current is a long vowel (ː) or diphthong and followed by consonant, likely boundary
    else if (isVowel && next && /[θðʃʒŋɡmnlrvwjθðfkspbt]/.test(next)) {
      // Check if the consonant is followed by another consonant or stress
      const nextNext = i + 2 < chars.length ? chars[i + 2] : null;
      if (nextNext && (/[ˈˌ]/.test(nextNext) || /[θðʃʒŋɡmnlrvwjθðfkspbt]/.test(nextNext))) {
        result.push(".");
      }
    }

    i++;
  }

  const joined = result.join("");
  return hasSlashes ? `/${joined}/` : joined;
}

/**
 * Normalize a phonetic string to standard IPA format (Cambridge-style).
 */
function normalizeIPA(phonetic: string): string | null {
  if (!phonetic) return null;

  let cleaned = phonetic.trim();

  // Remove surrounding slashes if present
  cleaned = cleaned.replace(/^\/|\/$/g, "");

  // Check if it looks like proper IPA (has standard IPA characters)
  if (IPA_RE.test(cleaned)) {
    // Add syllable dots in Cambridge style
    return addSyllableDots(`/${cleaned}/`);
  }

  return null;
}

/**
 * Hook to fetch standard IPA phonetic transcription (Cambridge/Oxford format).
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

      // Try each phonetics entry in order — prefer one with audio (Cambridge-sourced)
      let bestPhonetic = entry.phonetics?.find((p) => p.audio && p.text)?.text;
      if (!bestPhonetic) bestPhonetic = entry.phonetics?.find((p) => p.text)?.text;
      if (!bestPhonetic) bestPhonetic = entry.phonetic;
      if (!bestPhonetic) return null;

      // Handle multiple variants (US/UK)
      let final = bestPhonetic;
      if (final.includes(";")) {
        const parts = final.split(";").map((p) => p.trim());
        // Usually format: "/uk/; /us/" — last one is often US
        final = parts[parts.length - 1];
      }

      const normalized = normalizeIPA(final);
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
