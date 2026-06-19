import { useState, useEffect } from "react";
import { useReviewStore } from "../../store/review.store";
import type { SRSRating } from "../../types/Review";

export default function MultipleChoiceQuiz() {
  const {
    dueItems,
    currentIndex,
    submitRating,
    nextCard,
    isLoading,
  } = useReviewStore();

  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    setSelected("");
  }, [currentIndex]);

  if (isLoading) return <p style={{ color: "var(--text-muted)" }}>Loading...</p>;
  if (currentIndex >= dueItems.length) return <p style={{ color: "var(--text-muted)" }}>All done!</p>;

  const current = dueItems[currentIndex];
  const choices = [current.meaning];
  while (choices.length < 4) {
    const fake = "Fake meaning " + Math.random().toFixed(2);
    if (!choices.includes(fake)) choices.push(fake);
  }
  const shuffled = choices.sort(() => Math.random() - 0.5);

  const handleSubmit = async () => {
    const rating: SRSRating = selected ? "good" : "again";
    await submitRating(rating);
    nextCard();
  };

  return (
    <div className="card p-6" style={{ boxShadow: "var(--shadow)" }}>
      <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
        {current.word}
      </h2>
      <div className="space-y-2 mb-4">
        {shuffled.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-3 p-3 rounded-[5px] cursor-pointer transition-all"
            style={{
              backgroundColor: selected === opt ? "#e0e7ff" : "var(--surface-muted)",
              border: selected === opt ? "1.5px solid var(--primary)" : "1.5px solid transparent",
            }}
          >
            <input
              type="radio"
              value={opt}
              checked={selected === opt}
              onChange={(e) => setSelected(e.target.value)}
              className="w-4 h-4 accent-[var(--primary)]"
            />
            <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
              {opt}
            </span>
          </label>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 24px",
          backgroundColor: "var(--primary)",
          color: "var(--text-inverse)",
          borderRadius: "var(--radius-xs)",
          boxShadow: "var(--shadow-sm)",
          border: "none",
          fontWeight: "var(--font-weight-semibold)",
          fontSize: "var(--font-size-md)",
        }}
      >
        Submit
      </button>
    </div>
  );
}
