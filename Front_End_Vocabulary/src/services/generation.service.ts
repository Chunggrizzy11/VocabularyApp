import { api } from "./api";
import type { GeneratedWord } from "../types/Generation";
import type { VocabularyWord } from "../types/Vocabulary";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const generationService = {
  /** Preview generated words without saving */
  preview: (topic: string, count = 10, difficulty?: "easy" | "medium" | "hard") =>
    api.post<ApiResponse<GeneratedWord[]>>("/generation/preview", {
      topic,
      count,
      difficulty,
    }).then(r => r.data),

  /** Generate and save words to a topic */
  save: (topicId: string, topic: string, count = 10, difficulty?: string) =>
    api.post<ApiResponse<{ generated: number; words: VocabularyWord[] }>>(
      "/generation/save",
      { topicId, topic, count, difficulty }
    ).then(r => r.data),

  /** Look up a single word from the dictionary */
  lookup: (word: string) =>
    api.get<ApiResponse<GeneratedWord>>(`/generation/lookup/${encodeURIComponent(word)}`).then(r => r.data),
};
