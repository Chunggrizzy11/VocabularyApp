import { vocabularyRepository } from "../repositories/vocabulary.repository";
import { reviewRepository } from "../repositories/review.repository";
import { calculateNextReview } from "../utils/srsCalculator";
import type { SRSRating } from "../interfaces/review.interface";

export const reviewService = {
  getDueItems: async (userId?: string) => {
    const words = await vocabularyRepository.findDueForReview();
    return words.map((w) => ({
      vocabularyId: w._id.toString(),
      word: w.word,
      phonetic: w.phonetic,
      meaning: w.meaning,
      example: w.example,
      partOfSpeech: w.partOfSpeech,
      srsLevel: w.srsLevel,
      nextReviewAt: w.nextReviewAt?.toISOString() ?? null,
    }));
  },

  submitResult: async (vocabularyId: string, rating: SRSRating, userId?: string) => {
    const word = await vocabularyRepository.findById(vocabularyId);
    if (!word) throw new Error("Vocabulary not found");
    const { level, nextReviewAt } = calculateNextReview(word.srsLevel, rating);
    await vocabularyRepository.updateSRS(vocabularyId, level, nextReviewAt);
    await reviewRepository.create(vocabularyId, rating, userId);
  },
};
