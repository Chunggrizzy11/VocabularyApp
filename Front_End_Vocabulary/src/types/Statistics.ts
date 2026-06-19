export interface UserStats {
  totalWordsLearned: number;
  totalWordsMastered: number;
  totalReviewSessions: number;
  totalQuizSessions: number;
  averageQuizScore: number;
  currentStreak: number;
  longestStreak: number;
  totalTimeSpentMs: number;
  lastActiveDate: string | null;
}

export interface HeatmapDay {
  date: string;
  count: number;
  level: number;
}

export interface LearningProgress {
  date: string;
  wordsLearned?: number;
  wordsReviewed?: number;
}
