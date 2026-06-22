import MainLayout from "../../layouts/MainLayout";
import Flashcard from "../../components/flashcard/Flashcard";
import ReviewButtons from "../../components/flashcard/ReviewButtons";
import PronunciationButton from "../../components/common/PronunciationButton";
import TopicSelector from "../../components/common/TopicSelector";
import { useVocabulary } from "../../hooks/useVocabulary";
import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import { useAnimatedEntrance } from "../../hooks/useAnimatedEntrance";
import { useState, useMemo, useEffect } from "react";
import type { SRSRating } from "../../types/Review";

export default function ReviewPage() {
  const [topicId, setTopicId] = useState("");
  const { words, isLoading: vocabLoading } = useVocabulary(topicId || undefined);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  // Filter words that need review: never reviewed (nextReviewAt=null) OR overdue
  const dueItems = useMemo(() => {
    return words.filter(
      (w) => !w.nextReviewAt || new Date(w.nextReviewAt) <= new Date()
    );
  }, [words]);

  // Reset when topic changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsSessionComplete(false);
  }, [topicId, dueItems.length]);

  const containerRef = useAnimatedEntrance([vocabLoading, currentIndex, isSessionComplete, topicId]);

  const current = dueItems[currentIndex];

  const flipCard = () => {};

  const rateCurrent = (_rating: SRSRating) => {
    const next = currentIndex + 1;
    if (next >= dueItems.length) {
      setIsSessionComplete(true);
    } else {
      setCurrentIndex(next);
    }
  };

  if (vocabLoading) return <MainLayout><Loading label="Preparing review..." /></MainLayout>;

  if (isSessionComplete || dueItems.length === 0) {
    return (
      <MainLayout>
        <div ref={containerRef} className="max-w-2xl mx-auto">
          <h1 className="text-[28px] md:text-[36px] font-extrabold mb-6" style={{ color: "var(--text-heading)" }}>Review</h1>
          <TopicSelector selectedTopicId={topicId} onChange={setTopicId} />
          <EmptyState
            title={isSessionComplete ? "Review complete!" : "No words due for review"}
            description={
              isSessionComplete
                ? "Great job! Come back later for more practice."
                : topicId
                  ? "All words in this topic are up to date."
                  : "You're all caught up!"
            }
            icon="party"
          />
        </div>
      </MainLayout>
    );
  }

  const progress = ((currentIndex + 1) / dueItems.length) * 100;

  return (
    <MainLayout>
      <div ref={containerRef} className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h1 className="text-[28px] md:text-[36px] font-extrabold" style={{ color: "var(--text-heading)" }}>Review</h1>
          <span className="badge">{currentIndex + 1} of {dueItems.length}</span>
        </div>

        {/* Topic Selector */}
        <div className="mb-4 md:mb-6">
          <TopicSelector selectedTopicId={topicId} onChange={setTopicId} />
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
    </MainLayout>
  );
}
