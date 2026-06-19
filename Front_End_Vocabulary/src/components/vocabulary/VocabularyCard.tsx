import type { VocabularyWord } from "../../types/Vocabulary";
import PronunciationButton from "../common/PronunciationButton";
import Phonetic from "../common/Phonetic";

interface Props {
  word: VocabularyWord;
  onClick?: (word: VocabularyWord) => void;
}

export default function VocabularyCard({ word, onClick }: Props) {
  return (
    <div
      onClick={() => onClick?.(word)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onClick) onClick(word);
      }}
      className="card p-5 cursor-pointer"
      style={{ boxShadow: "var(--shadow)" }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg truncate" style={{ color: "var(--text)" }}>
              {word.word}
            </h3>
            <PronunciationButton word={word.word} size="sm" />
          </div>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {word.meaning}
          </p>
        </div>
        <span className="badge shrink-0 ml-2">
          {word.difficulty}
        </span>
      </div>
      <Phonetic word={word.word} fallback={word.phonetic} />
    </div>
  );
}
