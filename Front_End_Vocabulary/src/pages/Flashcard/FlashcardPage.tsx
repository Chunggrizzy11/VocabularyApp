import Flashcard from "../../components/flashcard/Flashcard";
import PronunciationButton from "../../components/common/PronunciationButton";
import TopicSelector from "../../components/common/TopicSelector";
import { useVocabulary } from "../../hooks/useVocabulary";
import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import { useState, useEffect, useRef } from "react";
import Icon from "../../components/common/Icon";
import MobileVolumeButton from "../../components/common/MobileVolumeButton";
import { useAnimatedEntrance } from "../../hooks/useAnimatedEntrance";
import { useStudyTimer } from "../../hooks/useStudyTimer";
import AddWordToNotebookModal from "../../components/notebook/AddWordToNotebookModal";
import { useNotebookStore } from "../../store/notebook.store";

const STORAGE_KEY = "flashcard_session";

function loadSession(): { topicId: string; index: number } {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { topicId: "", index: 0 };
}

function saveSession(topicId: string, index: number) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ topicId, index }));
  } catch { /* ignore */ }
}

function clearSession() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch { /* ignore */ }
}

export default function FlashcardPage() {
  const initial = loadSession();
  const [topicId, setTopicId] = useState(initial.topicId);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const { addWordToNotebook, fetchNotebooks } = useNotebookStore();
  useStudyTimer("flashcard", topicId || undefined);
  const { words, isLoading } = useVocabulary(topicId || undefined);
  const [index, setIndex] = useState(() => {
    // Validate index against words length when words load later
    return initial.index;
  });
  const [flipKey, setFlipKey] = useState(0);
  const isFirstRender = useRef(true);

  const containerRef = useAnimatedEntrance([isLoading, index, topicId]);

  // Load notebooks once when page mounts
  useEffect(() => {
    fetchNotebooks();
  }, [fetchNotebooks]);

  // Sync index to sessionStorage on every change
  useEffect(() => {
    saveSession(topicId, index);
  }, [topicId, index]);

  // Reset when topic changes or words list shrinks
  useEffect(() => {
    if (words.length > 0 && index >= words.length) {
      setIndex(Math.max(0, words.length - 1));
    }
  }, [words.length, index]);

  useEffect(() => {
    // Skip the very first mount — sessionStorage already restored the value
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Clear session when changing topic
    setIndex(0);
    setFlipKey((k) => k + 1);
    clearSession();
  }, [topicId]);

  if (isLoading) return <><MobileVolumeButton /><Loading label="Loading flashcards..." /></>;

  if (words.length === 0) {
    return (
      <>
        <MobileVolumeButton />
        <div ref={containerRef} className="max-w-2xl mx-auto px-3 sm:px-4">
          <h1 className="text-[24px] sm:text-[28px] md:text-[36px] font-extrabold mb-6" style={{ color: "var(--text-heading)" }}>Flashcard</h1>
          <TopicSelector selectedTopicId={topicId} onChange={setTopicId} />
          <EmptyState
            title="No vocabulary"
            description={topicId ? "No words in this topic. Try another topic or add words first." : "Add words to your topics first"}
            icon="inbox"
          />
        </div>
      </>
    );
  }

  const word = words[index];
  const prev = () => { setIndex((i) => Math.max(0, i - 1)); setFlipKey((k) => k + 1); };
  const next = () => { setIndex((i) => Math.min(words.length - 1, i + 1)); setFlipKey((k) => k + 1); };
  const progress = ((index + 1) / words.length) * 100;

  return (
    <>
      <MobileVolumeButton />
      <div ref={containerRef} className="max-w-2xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h1 className="text-[24px] sm:text-[28px] md:text-[36px] font-extrabold" style={{ color: "var(--text-heading)" }}>Flashcard</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaveModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ backgroundColor: "var(--brand-softer)", color: "var(--brand)" }}
              title="Lưu từ này vào Notebook"
            >
              <Icon name="star" size={16} color="var(--brand)" />
              <span className="hidden sm:inline">Save to Notebook</span>
            </button>
            <span className="badge">{index + 1} / {words.length}</span>
          </div>
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

        <div className="flex items-center justify-between mt-4 md:mt-6 gap-2">
          <button onClick={prev} disabled={index === 0} className="font-bold text-xs md:text-sm uppercase tracking-wide inline-flex items-center justify-center gap-1.5 flex-1 sm:flex-none" style={{ padding: "10px 12px", borderRadius: "12px", backgroundColor: index === 0 ? "var(--neutral-primary-soft)" : "var(--brand)", color: index === 0 ? "var(--text-disabled)" : "#FFFFFF", border: "2px solid " + (index === 0 ? "var(--border-default)" : "transparent"), boxShadow: index === 0 ? "0 2px 0 var(--neutral-tertiary-medium)" : "0 4px 0 var(--brand-strong)", cursor: index === 0 ? "not-allowed" : "pointer", opacity: index === 0 ? 0.5 : 1, minHeight: "44px" }}>
            <Icon name="arrow-left" size={14} color={index === 0 ? "var(--text-disabled)" : "white"} /> <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <PronunciationButton word={word.word} size="lg" showLabel />
            <span className="badge">{word.difficulty}</span>
          </div>

          <button onClick={next} disabled={index === words.length - 1} className="font-bold text-xs md:text-sm uppercase tracking-wide inline-flex items-center justify-center gap-1.5 flex-1 sm:flex-none" style={{ padding: "10px 12px", borderRadius: "12px", backgroundColor: index === words.length - 1 ? "var(--neutral-primary-soft)" : "var(--brand)", color: index === words.length - 1 ? "var(--text-disabled)" : "#FFFFFF", border: "2px solid " + (index === words.length - 1 ? "var(--border-default)" : "transparent"), boxShadow: index === words.length - 1 ? "0 2px 0 var(--neutral-tertiary-medium)" : "0 4px 0 var(--brand-strong)", cursor: index === words.length - 1 ? "not-allowed" : "pointer", opacity: index === words.length - 1 ? 0.5 : 1, minHeight: "44px" }}>
            <span className="hidden sm:inline">Next</span> <Icon name="arrow-right" size={14} color={index === words.length - 1 ? "var(--text-disabled)" : "white"} />
          </button>
        </div>
      </div>

      {/* Save to Notebook Modal */}
      <AddWordToNotebookModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        defaultWord={{
            word: word.word,
            meaning: word.meaning,
            phonetic: word.phonetic,
            partOfSpeech: word.partOfSpeech,
            example: word.example
        }}
        onAdd={async (wordData) => {
          await addWordToNotebook(wordData.notebookId, wordData);
          alert(`Đã lưu "${wordData.word}" vào notebook thành công!`);
          setIsSaveModalOpen(false);
        }}
      />
    </>
  );
}
