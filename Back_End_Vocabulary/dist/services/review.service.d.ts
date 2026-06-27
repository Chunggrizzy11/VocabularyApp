import type { SRSRating } from "../interfaces/review.interface";
export declare const reviewService: {
    getDueItems: (userId?: string) => Promise<{
        vocabularyId: string;
        word: string;
        phonetic: string | undefined;
        meaning: string;
        example: string;
        partOfSpeech: string;
        srsLevel: number;
        nextReviewAt: string | null;
    }[]>;
    submitResult: (vocabularyId: string, rating: SRSRating, userId?: string) => Promise<void>;
};
//# sourceMappingURL=review.service.d.ts.map