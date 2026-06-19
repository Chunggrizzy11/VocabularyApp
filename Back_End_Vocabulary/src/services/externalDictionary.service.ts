/**
 * External Dictionary Service
 *
 * Uses free APIs to generate vocabulary words by topic:
 * - Datamuse API (https://api.datamuse.com/) — semantic word search by topic
 * - Free Dictionary API (https://api.dictionaryapi.dev/) — phonetic, meaning, examples
 *
 * This allows auto-populating vocabulary for any topic without manual entry.
 */

const DATAMUSE_BASE = "https://api.datamuse.com";
const DICTIONARY_API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en";

// ───────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────

interface DatamuseWord {
  word: string;
  score: number;
  tags?: string[];
}

interface DictionaryResult {
  word: string;
  phonetic: string;
  phonetics: { text?: string; audio?: string }[];
  meanings: {
    partOfSpeech: string;
    definitions: { definition: string; example?: string }[];
    synonyms: string[];
    antonyms: string[];
  }[];
}

export interface GeneratedWord {
  word: string;
  phonetic: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  pronunciation: string;
}

// ───────────────────────────────────────────────────────────
// Helpers: delay to avoid rate-limit hammering
// ───────────────────────────────────────────────────────────

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ───────────────────────────────────────────────────────────
// 1. Datamuse — find words semantically related to a topic
// ───────────────────────────────────────────────────────────

async function fetchRelatedWords(topic: string, limit = 25): Promise<string[]> {
  const url = `${DATAMUSE_BASE}/words?ml=${encodeURIComponent(topic)}&max=${limit}&md=d`;
  const res = await fetch(url);

  if (!res.ok) {
    console.warn(`[Datamuse] HTTP ${res.status} for topic "${topic}"`);
    return [];
  }

  const data = (await res.json()) as DatamuseWord[];
  return data
    .filter((w) => /^[a-zA-Z\s-]+$/.test(w.word) && w.word.length >= 2)
    .slice(0, limit)
    .map((w) => w.word);
}

// ───────────────────────────────────────────────────────────
// 2. Free Dictionary API — get full definition entry
// ───────────────────────────────────────────────────────────

async function fetchDictionaryEntry(
  word: string
): Promise<{ phonetic: string; meaning: string; partOfSpeech: string; example: string; pronunciation: string } | null> {
  try {
    const res = await fetch(`${DICTIONARY_API_BASE}/${encodeURIComponent(word)}`);
    if (!res.ok) return null;

    const data = (await res.json()) as DictionaryResult[];
    const entry = data[0];
    if (!entry) return null;

    const phonetic = entry.phonetic || entry.phonetics?.find((p) => p.text)?.text || "";
    const pronunciation = entry.phonetics?.find((p) => p.audio)?.audio || "";

    // Take the first meaningful meaning + example
    for (const m of entry.meanings) {
      const def = m.definitions[0];
      if (def) {
        return {
          phonetic,
          meaning: def.definition,
          partOfSpeech: m.partOfSpeech,
          example: def.example || "",
          pronunciation,
        };
      }
    }

    // Fallback: return first meaning anyway
    const fallback = entry.meanings[0];
    return {
      phonetic,
      meaning: fallback?.definitions[0]?.definition || "",
      partOfSpeech: fallback?.partOfSpeech || "",
      example: fallback?.definitions[0]?.example || "",
      pronunciation,
    };
  } catch (err) {
    console.warn(`[DictionaryAPI] Error fetching "${word}":`, err);
    return null;
  }
}

// ───────────────────────────────────────────────────────────
// 3. Public API: generate words for a topic
// ───────────────────────────────────────────────────────────

export const externalDictionaryService = {
  /**
   * Generate vocabulary words for a given topic.
   * Steps:
   *   1. Query Datamuse for words semantically related to the topic.
   *   2. For each word, look up the Free Dictionary API.
   *   3. Return only words with successful lookups.
   *
   * @param topic        The topic name (e.g. "animal", "business", "travel")
   * @param count        Desired number of words (max 30)
   * @param difficulty   Filter by word length (easy ≤6, medium 7-9, hard ≥10)
   */
  generateForTopic: async (
    topic: string,
    count: number = 10,
    difficulty?: "easy" | "medium" | "hard"
  ): Promise<GeneratedWord[]> => {
    const safeCount = Math.min(Math.max(count, 1), 50);
    const candidates = await fetchRelatedWords(topic, safeCount * 2); // fetch extra to compensate for misses

    if (candidates.length === 0) {
      console.warn(`[Generator] No Datamuse results for "${topic}"; trying fallback keywords.`);
      // Fallback: try simpler topic words
      const fallbackCandidates = await fetchRelatedWords(topic.split(" ")[0], safeCount * 2);
      if (fallbackCandidates.length === 0) return [];
      candidates.push(...fallbackCandidates);
    }

    // Deduplicate
    const seen = new Set<string>();
    const unique: string[] = [];
    for (const w of candidates) {
      const lower = w.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        unique.push(w);
      }
    }

    // Difficulty filter (approximate: by word length)
    let filtered = unique;
    if (difficulty === "easy") filtered = unique.filter((w) => w.length <= 6);
    else if (difficulty === "medium") filtered = unique.filter((w) => w.length >= 7 && w.length <= 9);
    else if (difficulty === "hard") filtered = unique.filter((w) => w.length >= 10);

    if (filtered.length === 0) filtered = unique; // fallback to unfiltered

    // Take top N
    const top = filtered.slice(0, safeCount * 2);

    // Fetch dictionary entries (with concurrency limit)
    const results: GeneratedWord[] = [];
    const concurrency = 3;
    for (let i = 0; i < top.length && results.length < safeCount; i += concurrency) {
      const batch = top.slice(i, i + concurrency);
      const entries = await Promise.all(
        batch.map((w) => fetchDictionaryEntry(w))
      );

      for (let j = 0; j < batch.length && results.length < safeCount; j++) {
        const entry = entries[j];
        if (!entry) continue;

        results.push({
          word: batch[j],
          phonetic: entry.phonetic,
          meaning: entry.meaning,
          partOfSpeech: entry.partOfSpeech,
          example: entry.example,
          pronunciation: entry.pronunciation,
        });
      }

      // Small delay between batches to be polite
      if (i + concurrency < top.length) await delay(300);
    }

    return results;
  },

  /**
   * Search for a specific word and return its dictionary entry.
   */
  lookupWord: async (word: string): Promise<GeneratedWord | null> => {
    const entry = await fetchDictionaryEntry(word.trim());
    if (!entry) return null;
    return {
      word: word.trim(),
      ...entry,
    };
  },
};
