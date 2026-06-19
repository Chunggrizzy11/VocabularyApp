import { ReviewHistory } from "../models/ReviewHistory";
import type { IReviewHistory, SRSRating } from "../interfaces/review.interface";

export const reviewRepository = {
  create: async (vocabularyId: string, rating: SRSRating): Promise<IReviewHistory> =>
    ReviewHistory.create({ vocabularyId, rating }),
  findByVocabularyId: async (vocabularyId: string): Promise<IReviewHistory[]> =>
    ReviewHistory.find({ vocabularyId }).sort({ reviewedAt: -1 }),
  countByDateRange: async (startDate: Date, endDate: Date): Promise<number> =>
    ReviewHistory.countDocuments({ reviewedAt: { $gte: startDate, $lte: endDate } }),
  getRecentReviews: async (limit: number = 50): Promise<IReviewHistory[]> =>
    ReviewHistory.find().sort({ reviewedAt: -1 }).limit(limit),
};
