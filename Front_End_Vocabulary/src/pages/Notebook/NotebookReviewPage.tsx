import Flashcard from "../../components/flashcard/Flashcard";
import ReviewButtons from "../../components/flashcard/ReviewButtons";
import PronunciationButton from "../../components/common/PronunciationButton";
import { useNotebookStore } from "../../store/notebook.store";
import { notebookService } from "../../services/notebook.service";
import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import { useStudyTimer } from "../../hooks/useStudyTimer";
import { useAnimatedEntrance } from "../../hooks/useAnimatedEntrance";
import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { SRSRating } from "../../types/Review";

export default function NotebookReviewPage() {
  const { notebookId } = useParams<{ notebookId: string }>();
  const navigate = useNavigate();

  const {
    notebookWords,
    setNotebookWords,
    notebookWordsLoading,
    setNotebookWordsLoading,
    notebookWordsError,
    setNotebookWordsError,
  } = useNotebookStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  useEffect(() => {
    if (notebookId) {
      fetchDueWords();
    }
  }, [notebookId]);

  useStudyTimer("review");

  const fetchDueWords = async () => {
    if (!notebookId) return;

    setNotebookWordsLoading(true);
    setNotebookWordsError(null);

    try {
      const words = await notebookService.getDueWords(notebookId);
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

  const rateCurrent = async (rating: SRSRating) => {
    if (current && notebookId) {
      await notebookService.submitReview(notebookId, current._id, rating);
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
              : "All words in this notebook are up to date."
          }
          icon="party"
          action={{ label: "Back to Notebook", onClick: () => navigate(`/notebooks/${notebookId}`) }}
        />
      </div>
    );
  }

  const progress = ((currentIndex + 1) / dueItems.length) * 100;

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto px-3 sm:px-4">
      {/* Back button */}
      <button
        onClick={() => navigate(`/notebooks/${notebookId}`)}
        className="flex items-center gap-2 mb-4 text-sm font-medium transition-colors"
        style={{ color: "var(--brand)" }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Notebook
      </button>

      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h1 className="text-[24px] sm:text-[28px] md:text-[36px] font-extrabold" style={{ color: "var(--text-heading)" }}>
          Notebook Review
        </h1>
        <span className="badge text-[10px] sm:text-xs">{currentIndex + 1} of {dueItems.length}</span>
      </div>

      <div className="progress-track mb-6 md:mb-8">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <Flashcard word={current.word} meaning={current.meaning} phonetic={current.phonetic} />

      <div className="flex items-center justify-center mt-3 md:mt-4">
        <PronunciationButton word={current.word} size="lg" showLabel />
      </div>

      <ReviewButtons onRate={(r) => rateCurrent(r)} />
    </div>
  );
}