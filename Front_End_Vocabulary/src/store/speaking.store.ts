import { create } from "zustand";
import type { SpeakingWord, SpeakingSessionWord } from "../types/Speaking";
import { vocabularyService } from "../services/vocabulary.service";
import { calculatePronunciationScore } from "../utils/pronunciationScore";

interface SpeakingState {
  words: SpeakingWord[];
  currentWordIndex: number;
  sessionWords: SpeakingSessionWord[];
  isLoading: boolean;
  error: string | null;
  selectedTopicId: string | null;
  selectedTopicName: string | null;

  loadWords: (topicId?: string, topicName?: string) => Promise<void>;
  startSession: (topicId?: string, topicName?: string) => Promise<void>;
  submitWord: (recognizedText: string) => void;
  nextWord: () => void;
  prevWord: () => void;
  skipWord: () => void;
  againWord: () => void;
  resetSession: () => void;
  setError: (error: string | null) => void;
}

export const useSpeakingStore = create<SpeakingState>((set, get) => ({
  words: [],
  currentWordIndex: 0,
  sessionWords: [],
  isLoading: false,
  error: null,
  selectedTopicId: null,
  selectedTopicName: null,

  loadWords: async (topicId?: string, topicName?: string) => {
    set({ isLoading: true, error: null, selectedTopicId: topicId || null, selectedTopicName: topicName || null });
    try {
      const allWords = await vocabularyService.getAll(topicId);
      const shuffled = [...allWords].sort(() => Math.random() - 0.5);
      const mapped: SpeakingWord[] = shuffled.map(w => ({
        _id: w._id, word: w.word, phonetic: w.phonetic, meaning: w.meaning,
        partOfSpeech: w.partOfSpeech, imageUrl: w.imageUrl, audioUrl: w.audioUrl, difficulty: w.difficulty,
      }));
      set({ words: mapped, isLoading: false });
    } catch {
      set({ error: "Failed to load words. Please try again.", isLoading: false });
    }
  },

  startSession: async (topicId?: string, topicName?: string) => {
    set({ isLoading: true, error: null, currentWordIndex: 0, sessionWords: [] });
    try {
      const allWords = await vocabularyService.getAll(topicId);
      const shuffled = [...allWords].sort(() => Math.random() - 0.5);
      const mapped: SpeakingWord[] = shuffled.map(w => ({
        _id: w._id, word: w.word, phonetic: w.phonetic, meaning: w.meaning,
        partOfSpeech: w.partOfSpeech, imageUrl: w.imageUrl, audioUrl: w.audioUrl, difficulty: w.difficulty,
      }));
      set({ words: mapped, isLoading: false, selectedTopicId: topicId || null, selectedTopicName: topicName || null });
    } catch {
      set({ error: "Failed to load words. Please try again.", isLoading: false });
    }
  },

  submitWord: (recognizedText: string) => {
    const { words, currentWordIndex, sessionWords } = get();
    const currentWord = words[currentWordIndex];
    if (!currentWord) return;
    const score = calculatePronunciationScore(currentWord.word, recognizedText);
    const newSessionWord: SpeakingSessionWord = {
      vocabularyId: currentWord._id, word: currentWord.word, phonetic: currentWord.phonetic,
      meaning: currentWord.meaning, recognizedText, score, attemptedAt: new Date().toISOString(),
    };
    set({ sessionWords: [...sessionWords, newSessionWord] });
  },

  nextWord: () => {
    const { currentWordIndex } = get();
    set({ currentWordIndex: currentWordIndex + 1 });
  },

  prevWord: () => {
    const { currentWordIndex } = get();
    if (currentWordIndex > 0) set({ currentWordIndex: currentWordIndex - 1 });
  },

  skipWord: () => {
    const { words, currentWordIndex, sessionWords } = get();
    const w = words[currentWordIndex];
    if (!w) return;
    const skipped: SpeakingSessionWord = {
      vocabularyId: w._id, word: w.word, phonetic: w.phonetic, meaning: w.meaning,
      recognizedText: "(skipped)", score: 0, attemptedAt: new Date().toISOString(),
    };
    set({ sessionWords: [...sessionWords, skipped], currentWordIndex: currentWordIndex + 1 });
  },

  againWord: () => {
    const { sessionWords } = get();
    if (sessionWords.length === 0) return;
    const newSessionWords = sessionWords.slice(0, -1);
    set({ sessionWords: newSessionWords });
  },

  resetSession: () => set({ words: [], currentWordIndex: 0, sessionWords: [], isLoading: false, error: null, selectedTopicId: null, selectedTopicName: null }),
  setError: (error) => set({ error }),
}));

export const useCurrentWord = () => useSpeakingStore(s => s.words[s.currentWordIndex]);
export const useAverageScore = () => useSpeakingStore(s => {
  if (s.sessionWords.length === 0) return 0;
  const sum = s.sessionWords.reduce((acc, w) => acc + w.score, 0);
  return Math.round(sum / s.sessionWords.length);
});
export const useWordsPracticed = () => useSpeakingStore(s => s.sessionWords.length);
export const useProgressPercent = () => useSpeakingStore(s => {
  if (s.words.length === 0) return 0;
  return Math.min(100, Math.round((s.currentWordIndex / s.words.length) * 100));
});
export const useIsSessionComplete = () => useSpeakingStore(s => s.currentWordIndex >= s.words.length && s.words.length > 0);
export const useSelectedTopicName = () => useSpeakingStore(s => s.selectedTopicName);
export const useAgainWord = () => useSpeakingStore(s => s.againWord);
