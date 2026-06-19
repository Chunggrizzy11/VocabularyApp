import { useEffect, useCallback } from "react";
import { useTopicStore } from "../store/topic.store";
import { topicService } from "../services/topic.service";

export function useTopics() {
  const { topics, setTopics, setLoading, setError } = useTopicStore();

  const fetchTopics = useCallback(async () => {
    setLoading(true);
    try {
      const data = await topicService.getAll();
      setTopics(data);
    } catch (e: any) {
      setError(e.message ?? "Failed to load topics");
    } finally {
      setLoading(false);
    }
  }, [setTopics, setLoading, setError]);

  useEffect(() => { fetchTopics(); }, [fetchTopics]);

  return {
    topics,
    isLoading: useTopicStore((s) => s.isLoading),
    error: useTopicStore((s) => s.error),
    refresh: fetchTopics,
  };
}
