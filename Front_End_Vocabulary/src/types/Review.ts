export type SRSRating = "again" | "hard" | "good" | "easy";

export interface ReviewItem {
  vocabularyId: string;
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
  partOfSpeech: string;
  srsLevel: number;
  nextReviewAt: string | null;
}
