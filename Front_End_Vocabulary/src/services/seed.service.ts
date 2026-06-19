import { api } from "./api";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface SeedDefinition {
  title: string;
  description: string;
  targetWordCount: number;
  levels: string[];
}

interface SeedResult {
  topic: any;
  wordsCreated: number;
}

interface SeedAllResult {
  topics: number;
  totalWordsCreated: number;
  details: { title: string; wordsCreated: number; totalWords: number }[];
}

export const seedService = {
  /** Get all seedable topic definitions */
  getDefinitions: () =>
    api.get<ApiResponse<SeedDefinition[]>>("/seed/definitions").then(r => r.data),

  /** Seed a single topic by title */
  seedTopic: (title: string) =>
    api.post<ApiResponse<SeedResult>>("/seed/topic", { title }).then(r => r.data),

  /** Seed ALL predefined topics (500+ words in one click) */
  seedAll: () =>
    api.post<ApiResponse<SeedAllResult>>("/seed/all", {}).then(r => r.data),

  /** Drop all data and re-seed from word bank (fixes missing diacritics) */
  reseed: () =>
    api.post<ApiResponse<SeedAllResult>>("/seed/reseed", {}).then(r => r.data),

  /** Seed more words into an existing topic */
  seedIntoTopic: (topicId: string, keyword: string, count = 20) =>
    api.post<ApiResponse<{ created: number }>>(`/seed/topic/${topicId}`, { keyword, count }).then(r => r.data),
};
