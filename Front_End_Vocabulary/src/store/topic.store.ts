import { create } from "zustand";
import type { Topic } from "../types/Topic";

interface TopicState {
  topics: Topic[];
  selectedTopic: Topic | null;
  isLoading: boolean;
  error: string | null;
  setTopics: (topics: Topic[]) => void;
  setSelectedTopic: (topic: Topic | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTopicStore = create<TopicState>((set) => ({
  topics: [],
  selectedTopic: null,
  isLoading: false,
  error: null,
  setTopics: (topics) => set({ topics }),
  setSelectedTopic: (selectedTopic) => set({ selectedTopic }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
