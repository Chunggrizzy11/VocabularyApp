import { create } from "zustand";
import type { VocabularyWord } from "../types/Vocabulary";

interface VocabularyState {
  words: VocabularyWord[];
  searchResults: VocabularyWord[];
  isLoading: boolean;
  error: string | null;
  setWords: (words: VocabularyWord[]) => void;
  setSearchResults: (results: VocabularyWord[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useVocabularyStore = create<VocabularyState>((set) => ({
  words: [],
  searchResults: [],
  isLoading: false,
  error: null,
  setWords: (words) => set({ words }),
  setSearchResults: (searchResults) => set({ searchResults }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
