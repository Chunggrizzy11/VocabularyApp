import { useEffect, useCallback } from "react";
import { useStatisticsStore } from "../store/statistics.store";
import { statisticsService } from "../services/statistics.service";

export function useStatistics() {
  const store = useStatisticsStore();

  const loadAll = useCallback(async () => {
    store.setLoading(true);
    store.setError(null);

    // Fetch each endpoint independently — one failure doesn't break everything
    try {
      const stats = await statisticsService.getUserStats();
      store.setUserStats(stats);
    } catch {
      // stats API may not have data yet — that's fine
    }

    try {
      const progress = await statisticsService.getLearningProgress();
      store.setLearningProgress(progress);
    } catch {
      // progress API may not have data yet
    }

    try {
      const heatmap = await statisticsService.getHeatmapData();
      store.setHeatmapData(heatmap);
    } catch {
      // heatmap API may not have data yet
    }

    store.setLoading(false);
  }, [store.setUserStats, store.setLearningProgress, store.setHeatmapData, store.setLoading, store.setError]);

  useEffect(() => { loadAll(); }, [loadAll]);

  return {
    userStats: store.userStats,
    learningProgress: store.learningProgress,
    heatmapData: store.heatmapData,
    isLoading: store.isLoading,
    error: store.error,
    refresh: loadAll,
  };
}
