import type { SRSRating, SRSLevel } from "../types/Review";

export const SRS_LEVELS: SRSLevel[] = [
  { level: 0, name: "New", intervalDays: 0, multiplier: 0 },
  { level: 1, name: "Again", intervalDays: 1, multiplier: 1 },
  { level: 2, name: "Hard", intervalDays: 3, multiplier: 1.2 },
  { level: 3, name: "Good", intervalDays: 7, multiplier: 1.5 },
  { level: 4, name: "Easy", intervalDays: 14, multiplier: 2 },
];

export function calculateNextReview(
  currentLevel: number,
  rating: SRSRating
): { level: number; nextReviewAt: Date } {
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

  return {
    level: newLevel,
    nextReviewAt: nextReview,
  };
}

export function shouldReview(nextReviewAt: string | null): boolean {
  if (!nextReviewAt) return true;
  return new Date(nextReviewAt) <= new Date();
}

export function getDueWordsCount(words: { nextReviewAt: string | null }[]): number {
  return words.filter((w) => shouldReview(w.nextReviewAt)).length;
}