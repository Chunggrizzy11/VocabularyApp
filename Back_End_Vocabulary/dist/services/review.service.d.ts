import type { SRSRating } from "../interfaces/review.interface";
export declare const reviewService: {
    getDueItems: () => Promise<{
        vocabularyId: string;
        word: string;
        phonetic: string;
        meaning: string;
        example: string;
        partOfSpeech: string;
        srsLevel: number;
        nextReviewAt: string | null;
    }[]>;
    submitResult: (vocabularyId: string, rating: SRSRating) => Promise<void>;
};
//# sourceMappingURL=review.service.d.ts.map