import { api } from "./api";
import type { VocabularyWord } from "../types/Vocabulary";
import type { ReviewItem } from "../types/Review";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const vocabularyService = {
  getAll: (topicId?: string) => {
    const params = topicId ? { topicId } : undefined;
    return api.get<ApiResponse<VocabularyWord[]>>("/vocabulary", { params }).then(r => r.data);
  },
  getById: (id: string) => api.get<ApiResponse<VocabularyWord>>(`/vocabulary/${id}`).then(r => r.data),
  search: (query: string) =>
    api.get<ApiResponse<VocabularyWord[]>>("/vocabulary/search", { params: { q: query } }).then(r => r.data),
  getDueForReview: () =>
    api.get<ApiResponse<ReviewItem[]>>("/vocabulary/due-review").then(r => r.data),
};
