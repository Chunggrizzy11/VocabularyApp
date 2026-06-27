import type { IReviewHistory, SRSRating } from "../interfaces/review.interface";
export declare const reviewRepository: {
    create: (vocabularyId: string, rating: SRSRating, userId?: string) => Promise<IReviewHistory>;
    findByVocabularyId: (vocabularyId: string) => Promise<IReviewHistory[]>;
    countByDateRange: (startDate: Date, endDate: Date) => Promise<number>;
    getRecentReviews: (limit?: number) => Promise<IReviewHistory[]>;
};
//# sourceMappingURL=review.repository.d.ts.map