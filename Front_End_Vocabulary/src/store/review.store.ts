import { create } from "zustand";
import type { ReviewItem } from "../types/Review";

interface ReviewState {
  dueItems: ReviewItem[];
  currentIndex: number;
  isFlipped: boolean;
  isLoading: boolean;
  error: string | null;
  isSessionComplete: boolean;
  setDueItems: (items: ReviewItem[]) => void;
  nextCard: () => void;
  flipCard: () => void;
  resetSession: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  dueItems: [],
  currentIndex: 0,
  isFlipped: false,
  isLoading: false,
  error: null,
  isSessionComplete: false,
  setDueItems: (dueItems) => set({ dueItems, currentIndex: 0, isSessionComplete: false, isFlipped: false }),
  nextCard: () => set((state) => {
    const next = state.currentIndex + 1;
    return { currentIndex: next, isFlipped: false, isSessionComplete: next >= state.dueItems.length };
  }),
  flipCard: () => set((state) => ({ isFlipped: !state.isFlipped })),
  resetSession: () => set({ dueItems: [], currentIndex: 0, isFlipped: false, isSessionComplete: false, isLoading: false, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
