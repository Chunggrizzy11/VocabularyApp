import { api } from "./api";
import type { UserStats, LearningProgress, HeatmapDay } from "../types/Statistics";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const statisticsService = {
  getUserStats: () => api.get<ApiResponse<UserStats>>("/statistics").then(r => r.data),
  getLearningProgress: (days?: number) =>
    api.get<ApiResponse<LearningProgress[]>>("/statistics/progress", {
      params: { days: String(days ?? 30) },
    }).then(r => r.data),
  getHeatmapData: (year?: number) =>
    api.get<ApiResponse<HeatmapDay[]>>("/statistics/heatmap", {
      params: year ? { year: String(year) } : undefined,
    }).then(r => r.data),
};
