import { SRS_LEVELS } from "./constants";
import type { SRSRating } from "../interfaces/review.interface";

export function calculateNextReview(currentLevel: number, rating: SRSRating): { level: number; nextReviewAt: Date } {
  const ratingToLevel: Record<SRSRating, number> = {
    again: 0,
    hard: Math.max(1, currentLevel),
    good: currentLevel + 1,
    easy: currentLevel + 2,
  };
  const newLevel = Math.min(ratingToLevel[rating], 4);
  const srsLevel = SRS_LEVELS[newLevel];
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + srsLevel.intervalDays);
  return { level: newLevel, nextReviewAt: nextReview };
}
