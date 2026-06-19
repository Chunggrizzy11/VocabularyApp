import { api } from "./api";
import type { ReviewItem, SRSRating } from "../types/Review";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const reviewService = {
  getDueItems: () =>
    api.get<ApiResponse<ReviewItem[]>>("/review/due").then(r => r.data),
  submitResult: (vocabularyId: string, rating: SRSRating) =>
    api.post<ApiResponse<any>>("/review/results", { vocabularyId, rating }).then(r => r.data),
};
