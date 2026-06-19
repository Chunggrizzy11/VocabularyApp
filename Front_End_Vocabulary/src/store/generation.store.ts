import { create } from "zustand";
import type { GeneratedWord } from "../types/Generation";
import type { Topic } from "../types/Topic";
import { generationService } from "../services/generation.service";
import { topicService } from "../services/topic.service";

interface GenerationState {
  /** Selected topic to generate words into */
  selectedTopic: Topic | null;
  /** Whether we are fetching topics for the dropdown */
  topics: Topic[];
  topicsLoading: boolean;
  /** Preview results from the dictionary API */
  previewResults: GeneratedWord[];
  previewLoading: boolean;
  previewError: string | null;
  /** Saving state */
  saving: boolean;
  saveResult: { generated: number } | null;
  /** Form fields */
  topicName: string;
  wordCount: number;
  difficulty: string;

  setSelectedTopic: (topic: Topic | null) => void;
  setTopicName: (name: string) => void;
  setWordCount: (count: number) => void;
  setDifficulty: (d: string) => void;
  fetchTopics: () => Promise<void>;
  preview: () => Promise<void>;
  saveGenerated: () => Promise<void>;
  reset: () => void;
}

const initialState = {
  selectedTopic: null,
  topics: [],
  topicsLoading: false,
  previewResults: [],
  previewLoading: false,
  previewError: null,
  saving: false,
  saveResult: null,
  topicName: "",
  wordCount: 10,
  difficulty: "mixed",
};

export const useGenerationStore = create<GenerationState>((set, get) => ({
  ...initialState,

  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  setTopicName: (topicName) => set({ topicName }),
  setWordCount: (wordCount) => set({ wordCount }),
  setDifficulty: (difficulty) => set({ difficulty }),

  fetchTopics: async () => {
    set({ topicsLoading: true });
    try {
      const topics = await topicService.getAll();
      set({ topics });
    } catch {
      // silently fail
    } finally {
      set({ topicsLoading: false });
    }
  },

  preview: async () => {
    const { topicName, wordCount, difficulty } = get();
    if (!topicName.trim()) return;

    set({ previewLoading: true, previewError: null, previewResults: [] });
    try {
      const results = await generationService.preview(
        topicName.trim(),
        wordCount,
        difficulty === "mixed" ? undefined : (difficulty as "easy" | "medium" | "hard")
      );
      set({ previewResults: results });
    } catch (e: any) {
      set({ previewError: e.message ?? "Failed to generate preview" });
    } finally {
      set({ previewLoading: false });
    }
  },

  saveGenerated: async () => {
    const { selectedTopic, topicName, wordCount, difficulty } = get();
    if (!selectedTopic) return;

    set({ saving: true, saveResult: null });
    try {
      const result = await generationService.save(
        selectedTopic._id,
        topicName.trim(),
        wordCount,
        difficulty
      );
      set({ saveResult: { generated: result.generated } });
    } catch (e: any) {
      set({ previewError: e.message ?? "Failed to save words" });
    } finally {
      set({ saving: false });
    }
  },

  reset: () => set(initialState),
}));
