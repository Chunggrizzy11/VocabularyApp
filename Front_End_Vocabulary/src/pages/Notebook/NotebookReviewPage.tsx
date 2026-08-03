import Flashcard from "../../components/flashcard/Flashcard";
import ReviewButtons from "../../components/flashcard/ReviewButtons";
import PronunciationButton from "../../components/common/PronunciationButton";
import { useNotebookStore } from "../../store/notebook.store";
import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import { useStudyTimer } from "../../hooks/useStudyTimer";
import { useAnimatedEntrance } from "../../hooks/useAnimatedEntrance";
import { useState, useMemo, useEffect } from "react";
import type { SRSRating } from "../../types/Review";

export default function NotebookReviewPage() {
  const {
    notebookWords,
    notebookWordsLoading,
    notebookWordsError,
    setNotebookWords,
    setNotebookWordsLoading,
    setNotebookWordsError,
    submitReview,
  } = useNotebookStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [notebookId, setNotebookId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const notebookParam = urlParams.get("notebookId");
    if (notebookParam) {
      setNotebookId(notebookParam);
    }
  }, []);

  useEffect(() => {
    if (notebookId) {
      fetchNotebookWords();
    }
  }, [notebookId]);

  useStudyTimer("review");

  const fetchNotebookWords = async () => {
    if (!notebookId) return;

    setNotebookWordsLoading(true);
    setNotebookWordsError(null);

    try {
      const response = await fetch(`/api/notebooks/${notebookId}/due`);
      if (!response.ok) throw new Error("Failed to fetch due words");
      const words = await response.json();
      setNotebookWords(words);
    } catch (error) {
      setNotebookWordsError((error as Error).message);
    } finally {
      setNotebookWordsLoading(false);
    }
  };

  const dueItems = useMemo(() => {
    return notebookWords.filter(
      (w) => !w.nextReviewAt || new Date(w.nextReviewAt) <= new Date()
    );
  }, [notebookWords]);

  useEffect(() => {
    setCurrentIndex(0);
    setIsSessionComplete(false);
  }, [notebookId, dueItems.length]);

  const containerRef = useAnimatedEntrance([
    notebookWordsLoading,
    currentIndex,
    isSessionComplete,
    notebookId,
  ]);

  const current = dueItems[currentIndex];

  const flipCard = () => {};

  const rateCurrent = async (rating: SRSRating) => {
    if (current && notebookId) {
      await submitReview(notebookId, current._id, rating);
    }

    const next = currentIndex + 1;
    if (next >= dueItems.length) {
      setIsSessionComplete(true);
    } else {
      setCurrentIndex(next);
    }
  };

  if (notebookWordsLoading) return <Loading label="Loading review..." />;

  if (notebookWordsError) {
    return (
      <div className="max-w-2xl mx-auto px-3 sm:px-4">
        <div className="card p-4 sm:p-6 text-center">
          <h2 className="text-lg font-bold text-danger mb-2">Error</h2>
          <p className="text-sm text-body-subtle">{notebookWordsError}</p>
        </div>
      </div>
    );
  }

  if (isSessionComplete || dueItems.length === 0) {
    return (
      <div ref={containerRef} className="max-w-2xl mx-auto px-3 sm:px-4">
        <h1 className="text-[24px] sm:text-[28px] md:text-[36px] font-extrabold mb-4 md:mb-6" style={{ color: "var(--text-heading)" }}>
          Notebook Review Complete!
        </h1>
        <EmptyState
          title={isSessionComplete ? "Review complete!" : "No words due for review"}
          description={
            isSessionComplete
              ? "Great job! Come back later for more practice."
              : notebookId
              ? "All words in this notebook are up to date."
              : "No notebook selected."
          }
          icon="party"
        />
      </div>
    );
  }

  const progress = ((currentIndex + 1) / dueItems.length) * 100;

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto px-3 sm:px-4">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h1 className="text-[24px] sm:text-[28px] md:text-[36px] font-extrabold" style={{ color: "var(--text-heading)" }}>
          Notebook Review
        </h1>
        <span className="badge text-[10px] sm:text-xs">{currentIndex + 1} of {dueItems.length}</span>
      </div>

      <div className="progress-track mb-6 md:mb-8">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div onClick={flipCard}>
        <Flashcard word={current.word} meaning={current.meaning} />
      </div>

      <div className="flex items-center justify-center mt-3 md:mt-4">
        <PronunciationButton word={current.word} size="lg" showLabel />
      </div>

      <ReviewButtons onRate={(r) => rateCurrent(r)} />
    </div>
  );
}