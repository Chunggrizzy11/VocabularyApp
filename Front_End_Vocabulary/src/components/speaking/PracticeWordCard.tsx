import type { SpeakingWord } from "../../types/Speaking";
import MicrophoneButton from "./MicrophoneButton";
import ScoreDisplay from "./ScoreDisplay";
import Icon from "../common/Icon";

interface Props {
  word: SpeakingWord;
  currentIndex: number;
  totalWords: number;
  showingScore: boolean;
  score: number;
  recognizedText: string;
  topicName?: string;
  onTranscript: (text: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onAgain: () => void;
  onListen: () => void;
  onListenAgain: () => void;
}

export default function PracticeWordCard({
  word, currentIndex, totalWords, showingScore, score, recognizedText,
  topicName, onTranscript, onNext, onPrev, onAgain, onListen, onListenAgain,
}: Props) {
  const progressPercent = totalWords > 0 ? ((currentIndex + (showingScore ? 1 : 0)) / totalWords) * 100 : 0;

  return (
    <div className="card p-6 md:p-8 max-w-lg mx-auto" style={{ animation: "fadeUp 300ms ease-out both" }}>
      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-bold" style={{ color: "var(--text-body-subtle)" }}>
            {topicName ? `${topicName} · ` : ""}Word {Math.min(currentIndex + 1, totalWords)} of {totalWords}
          </span>
          <span className="text-xs font-bold" style={{ color: "var(--text-body-subtle)" }}>
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Word display */}
      {!showingScore && (
        <div className="text-center mb-6">
          <h2 className="text-[44px] md:text-[56px] font-extrabold mb-2 leading-tight" style={{ color: "var(--text-heading)" }}>
            {word.word}
          </h2>
          {word.phonetic && (
            <p className="text-base font-semibold mb-3" style={{ color: "var(--text-body-subtle)" }}>
              {word.phonetic}
            </p>
          )}
          <p className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--fg-brand-strong)" }}>
            {word.meaning}
          </p>

          <button onClick={onListen}
            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 font-bold text-sm rounded-[12px]"
            style={{ backgroundColor: "var(--brand-softer)", color: "var(--fg-brand-strong)", border: "2px solid var(--border-brand-subtle)" }}>
            <Icon name="volume-low" size={18} color="currentColor" /> Listen to Pronunciation
          </button>
        </div>
      )}

      {!showingScore && (
        <div className="mb-4">
          <MicrophoneButton onTranscript={onTranscript} />
        </div>
      )}

      {/* Prev / Next navigation — only when not showing score */}
      {!showingScore && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={onPrev}
            disabled={currentIndex <= 0}
            className="flex items-center gap-1.5 px-4 py-2 font-bold text-xs uppercase tracking-wide rounded-[10px] cursor-pointer border-none"
            style={{
              backgroundColor: "var(--neutral-secondary-medium)",
              color: currentIndex <= 0 ? "var(--text-body-subtle)" : "var(--text-heading)",
              opacity: currentIndex <= 0 ? 0.4 : 1,
              cursor: currentIndex <= 0 ? "not-allowed" : "pointer",
            }}
          >
            <Icon name="chevron-left" size={14} color="currentColor" /> Prev
          </button>
          <button
            onClick={onNext}
            disabled={currentIndex >= totalWords - 1}
            className="flex items-center gap-1.5 px-4 py-2 font-bold text-xs uppercase tracking-wide rounded-[10px] cursor-pointer border-none"
            style={{
              backgroundColor: "var(--neutral-secondary-medium)",
              color: currentIndex >= totalWords - 1 ? "var(--text-body-subtle)" : "var(--text-heading)",
              opacity: currentIndex >= totalWords - 1 ? 0.4 : 1,
              cursor: currentIndex >= totalWords - 1 ? "not-allowed" : "pointer",
            }}
          >
            Next <Icon name="chevron-right" size={14} color="currentColor" />
          </button>
        </div>
      )}

      {showingScore && (
        <ScoreDisplay score={score} targetWord={word.word} recognizedText={recognizedText}
          onNext={onNext} onAgain={onAgain} onListenAgain={onListenAgain} />
      )}
    </div>
  );
}
