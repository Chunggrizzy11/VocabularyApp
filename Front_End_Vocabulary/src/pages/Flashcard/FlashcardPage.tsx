import MainLayout from "../../layouts/MainLayout";
import Flashcard from "../../components/flashcard/Flashcard";
import PronunciationButton from "../../components/common/PronunciationButton";
import TopicSelector from "../../components/common/TopicSelector";
import { useVocabulary } from "../../hooks/useVocabulary";
import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import { useState, useEffect } from "react";
import Icon from "../../components/common/Icon";
import MobileVolumeButton from "../../components/common/MobileVolumeButton";
import { useAnimatedEntrance } from "../../hooks/useAnimatedEntrance";

export default function FlashcardPage() {
  const [topicId, setTopicId] = useState("");
  const { words, isLoading } = useVocabulary(topicId || undefined);
  const [index, setIndex] = useState(0);
  const [flipKey, setFlipKey] = useState(0);

  const containerRef = useAnimatedEntrance([isLoading, index, topicId]);

  // Reset index when topic changes
  useEffect(() => {
    setIndex(0);
    setFlipKey((k) => k + 1);
  }, [topicId, words.length]);

  if (isLoading) return <MainLayout><MobileVolumeButton /><Loading label="Loading flashcards..." /></MainLayout>;

  if (words.length === 0) {
    return (
      <MainLayout>
        <MobileVolumeButton />
        <div ref={containerRef} className="max-w-2xl mx-auto">
          <h1 className="text-[28px] md:text-[36px] font-extrabold mb-6" style={{ color: "var(--text-heading)" }}>Flashcard</h1>
          <TopicSelector selectedTopicId={topicId} onChange={setTopicId} />
          <EmptyState
            title="No vocabulary"
            description={topicId ? "No words in this topic. Try another topic or add words first." : "Add words to your topics first"}
            icon="inbox"
          />
        </div>
      </MainLayout>
    );
  }

  const word = words[index];
  const prev = () => { setIndex((i) => Math.max(0, i - 1)); setFlipKey((k) => k + 1); };
  const next = () => { setIndex((i) => Math.min(words.length - 1, i + 1)); setFlipKey((k) => k + 1); };
  const progress = ((index + 1) / words.length) * 100;

  return (
    <MainLayout>
        <MobileVolumeButton />
      <div ref={containerRef} className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h1 className="text-[28px] md:text-[36px] font-extrabold" style={{ color: "var(--text-heading)" }}>Flashcard</h1>
          <span className="badge">{index + 1} / {words.length}</span>
        </div>

        {/* Topic Selector */}
        <div className="mb-4 md:mb-6">
          <TopicSelector selectedTopicId={topicId} onChange={setTopicId} />
        </div>

        <div className="progress-track mb-6 md:mb-8">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div key={flipKey}>
          <Flashcard word={word.word} meaning={word.meaning} phonetic={word.phonetic} />
        </div>

        <div className="flex items-center justify-between mt-4 md:mt-6">
          <button onClick={prev} disabled={index === 0} className="font-bold text-xs md:text-sm uppercase tracking-wide inline-flex items-center gap-1.5" style={{ padding: "10px 12px", borderRadius: "12px", backgroundColor: index === 0 ? "var(--neutral-primary-soft)" : "var(--brand)", color: index === 0 ? "var(--text-disabled)" : "#FFFFFF", border: "2px solid " + (index === 0 ? "var(--border-default)" : "transparent"), boxShadow: index === 0 ? "0 2px 0 var(--neutral-tertiary-medium)" : "0 4px 0 var(--brand-strong)", cursor: index === 0 ? "not-allowed" : "pointer", opacity: index === 0 ? 0.5 : 1 }}>
            <Icon name="arrow-left" size={14} color={index === 0 ? "var(--text-disabled)" : "white"} /> <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-1.5 md:gap-2">
            <PronunciationButton word={word.word} size="lg" showLabel />
            <span className="badge">{word.difficulty}</span>
          </div>

          <button onClick={next} disabled={index === words.length - 1} className="font-bold text-xs md:text-sm uppercase tracking-wide inline-flex items-center gap-1.5" style={{ padding: "10px 12px", borderRadius: "12px", backgroundColor: index === words.length - 1 ? "var(--neutral-primary-soft)" : "var(--brand)", color: index === words.length - 1 ? "var(--text-disabled)" : "#FFFFFF", border: "2px solid " + (index === words.length - 1 ? "var(--border-default)" : "transparent"), boxShadow: index === words.length - 1 ? "0 2px 0 var(--neutral-tertiary-medium)" : "0 4px 0 var(--brand-strong)", cursor: index === words.length - 1 ? "not-allowed" : "pointer", opacity: index === words.length - 1 ? 0.5 : 1 }}>
            <span className="hidden sm:inline">Next</span> <Icon name="arrow-right" size={14} color={index === words.length - 1 ? "var(--text-disabled)" : "white"} />
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
