/**
 * Massive Word Bank — 1000+ English words by CEFR level (A1→C2) and topic.
 * All Vietnamese meanings have proper diacritics (dấu câu).
 */
export interface BankWord {
    word: string;
    meaning: string;
    phonetic: string;
    pos: string;
    example: string;
    level: string;
    topic: string;
}
export declare const WORD_BANK: BankWord[];
//# sourceMappingURL=wordBank.d.ts.map