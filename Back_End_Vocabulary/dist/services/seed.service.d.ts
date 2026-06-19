export interface SeedTopicDef {
    title: string;
    description: string;
    topicTags: string[];
    apiKeywords: string[];
    levels: string[];
    targetWordCount?: number;
}
export declare const seedService: {
    /** Get all seedable topic definitions */
    getDefinitions: () => SeedTopicDef[];
    /**
     * Seed a single topic: create topic + bulk-insert vocabulary from offline bank.
     * Instant — no external API calls.
     */
    seedTopic: (def: SeedTopicDef) => Promise<{
        topic: any;
        wordsCreated: number;
    }>;
    /**
     * Seed ALL predefined topics using offline bank only.
     * Instant — no external API calls.
     */
    seedAll: () => Promise<{
        title: string;
        wordsCreated: number;
        totalWords: number;
    }[]>;
    /** Seed random words into an existing topic from word bank */
    seedIntoTopic: (topicId: string, keyword: string, count: number) => Promise<number>;
};
//# sourceMappingURL=seed.service.d.ts.map