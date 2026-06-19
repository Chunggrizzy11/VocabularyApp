import { useState } from "react";
import { useReviewStore } from "../../store/review.store";
import type { SRSRating } from "../../types/Review";

export default function MatchingQuiz() {
  const {
    dueItems,
    currentIndex,
    isLoading,
    submitRating,
    nextCard,
  } = useReviewStore();

  const [selected, setSelected] = useState<string | null>(null);

  if (isLoading) return <p style={{ color: "var(--text-muted)" }}>Loading...</p>;
  if (currentIndex >= dueItems.length) return <p style={{ color: "var(--text-muted)" }}>All done!</p>;

  const current = dueItems[currentIndex];

  const handleSelect = (id: string) => {
    if (selected === id) {
      const rating: SRSRating = "good";
      submitRating(rating);
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
  ];
  const shuffled = pairs.sort(() => Math.random() - 0.5);

  return (
    <div className="card p-6" style={{ boxShadow: "var(--shadow)" }}>
      <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
        Match the word with its meaning
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {shuffled.map((p) => (
          <div
            key={p.id}
            onClick={() => handleSelect(p.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSelect(p.id);
            }}
            className="p-4 text-sm font-medium cursor-pointer transition-all"
            style={{
              backgroundColor: selected === p.id ? "#e0e7ff" : "var(--surface-muted)",
              border: selected === p.id
                ? "1.5px solid var(--primary)"
                : "1.5px solid var(--border)",
              borderRadius: "var(--radius-xs)",
              color: "var(--text)",
            }}
          >
            {p.label}
          </div>
        ))}
      </div>
    </div>
  );
}
