/**
 * External Dictionary Service
 *
 * Uses free APIs to generate vocabulary words by topic:
 * - Datamuse API (https://api.datamuse.com/) — semantic word search by topic
 * - Free Dictionary API (https://api.dictionaryapi.dev/) — phonetic, meaning, examples
 *
 * This allows auto-populating vocabulary for any topic without manual entry.
 */
export interface GeneratedWord {
    word: string;
    phonetic: string;
    meaning: string;
    partOfSpeech: string;
    example: string;
    pronunciation: string;
}
export declare const externalDictionaryService: {
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
    generateForTopic: (topic: string, count?: number, difficulty?: "easy" | "medium" | "hard") => Promise<GeneratedWord[]>;
    /**
     * Search for a specific word and return its dictionary entry.
     */
    lookupWord: (word: string) => Promise<GeneratedWord | null>;
};
//# sourceMappingURL=externalDictionary.service.d.ts.map