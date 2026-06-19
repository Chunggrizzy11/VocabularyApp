import { create } from "zustand";
import type { UserStats, LearningProgress, HeatmapDay } from "../types/Statistics";

interface StatisticsState {
  userStats: UserStats | null;
  learningProgress: LearningProgress[];
  heatmapData: HeatmapDay[];
  isLoading: boolean;
  error: string | null;
  setUserStats: (stats: UserStats | null) => void;
  setLearningProgress: (progress: LearningProgress[]) => void;
  setHeatmapData: (data: HeatmapDay[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStatisticsStore = create<StatisticsState>((set) => ({
  userStats: null,
  learningProgress: [],
  heatmapData: [],
  isLoading: false,
  error: null,
  setUserStats: (userStats) => set({ userStats }),
  setLearningProgress: (learningProgress) => set({ learningProgress }),
  setHeatmapData: (heatmapData) => set({ heatmapData }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
