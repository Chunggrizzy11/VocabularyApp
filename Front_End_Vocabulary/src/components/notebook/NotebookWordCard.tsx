import type { INotebookWord } from "../../types/notebook";

interface NotebookWordCardProps {
  word: INotebookWord;
}

export default function NotebookWordCard({ word }: NotebookWordCardProps) {
  const getLevelColor = (level: number) => {
    if (level >= 4) return "var(--brand-strong)";
    if (level >= 1) return "var(--brand)";
    return "var(--text-body-subtle)";
  };

  return (
    <div className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold truncate" style={{ color: "var(--text-heading)" }}>
            {word.word}
          </h3>
          <p className="text-xs font-medium" style={{ color: "var(--text-body-subtle)" }}>
            {word.phonetic} {word.partOfSpeech && `• ${word.partOfSpeech}`}
          </p>
        </div>
        <div
          className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
          style={{
            backgroundColor: "var(--brand-softer)",
            color: getLevelColor(word.srsLevel),
            border: `1px solid ${getLevelColor(word.srsLevel)}20`
          }}
        >
          Level {word.srsLevel}
        </div>
      </div>

      <p className="text-sm mb-3 line-clamp-2" style={{ color: "var(--text-body)" }}>
        {word.meaning}
      </p>

      {word.example && (
        <div className="mb-4 p-2 rounded bg-neutral-tertiary-medium text-xs italic" style={{ color: "var(--text-body-subtle)" }}>
          "{word.example}"
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
        <span className="text-[10px]" style={{ color: "var(--text-body-subtle)" }}>
          Next: {word.nextReviewAt ? new Date(word.nextReviewAt).toLocaleDateString() : "New"}
        </span>
      </div>
    </div>
  );
}