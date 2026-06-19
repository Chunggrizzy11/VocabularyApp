import { useEffect, useCallback } from "react";
import { useReviewStore } from "../store/review.store";
import { reviewService } from "../services/review.service";
import type { SRSRating } from "../types/Review";

export function useReview() {
  const store = useReviewStore();

  const loadDueItems = useCallback(async () => {
    store.setLoading(true);
    try {
      const items = await reviewService.getDueItems();
      store.setDueItems(items);
    } catch (e: any) {
      store.setError(e.message ?? "Failed to load review items");
    } finally {
      store.setLoading(false);
    }
  }, [store.setDueItems, store.setLoading, store.setError]);

  const rateCurrent = useCallback(async (rating: SRSRating) => {
    if (store.isSessionComplete) return;
    const current = store.dueItems[store.currentIndex];
    if (!current) return;
    await reviewService.submitResult(current.vocabularyId, rating);
    store.nextCard();
  }, [store.dueItems, store.currentIndex, store.nextCard, store.isSessionComplete]);

  useEffect(() => { loadDueItems(); }, [loadDueItems]);

  return {
    dueItems: store.dueItems,
    currentIndex: store.currentIndex,
    isFlipped: store.isFlipped,
    flipCard: store.flipCard,
    rateCurrent,
    resetSession: store.resetSession,
    isLoading: store.isLoading,
    error: store.error,
    isSessionComplete: store.isSessionComplete,
  };
}
