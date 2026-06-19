import { useState } from "react";
import { useReviewStore } from "../../store/review.store";

export default function MatchingQuiz() {
  const { dueItems, currentIndex, isLoading, nextCard } = useReviewStore();
  const [selected, setSelected] = useState<string | null>(null);

  if (isLoading) return <p style={{ color: "var(--text-body)" }}>Loading...</p>;
  if (currentIndex >= dueItems.length) return <p style={{ color: "var(--text-body)" }}>All done!</p>;

  const current = dueItems[currentIndex];

  const handleSelect = (id: string) => {
    if (selected === id) {
      setSelected(null);
      nextCard();
    } else {
      setSelected(id);
    }
  };

  const pairs = [
    { id: "1", label: current.word },
    { id: "2", label: current.meaning },
    { id: "3", label: "Other" },
    { id: "4", label: "Another" },
  ].sort(() => Math.random() - 0.5);

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-heading)" }}>
        Match the word with its meaning
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {pairs.map((p) => (
          <div
            key={p.id}
            onClick={() => handleSelect(p.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") handleSelect(p.id); }}
            className="p-4 text-sm font-bold transition-all cursor-pointer"
            style={{
              backgroundColor: selected === p.id ? "var(--brand-softer)" : "var(--neutral-secondary-medium)",
              border: selected === p.id ? "2px solid var(--border-brand-subtle)" : "2px solid var(--border-default)",
              borderRadius: "var(--radius-default)",
              color: selected === p.id ? "var(--fg-brand-strong)" : "var(--text-heading)",
            }}
          >
            {p.label}
          </div>
        ))}
      </div>
    </div>
  );
}
