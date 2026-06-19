import { useState, useEffect } from "react";
import { useReviewStore } from "../../store/review.store";

export default function MultipleChoiceQuiz() {
  const { dueItems, currentIndex, nextCard, isLoading } = useReviewStore();
  const [selected, setSelected] = useState<string>("");

  useEffect(() => { setSelected(""); }, [currentIndex]);

  if (isLoading) return <p style={{ color: "var(--text-body)" }}>Loading...</p>;
  if (currentIndex >= dueItems.length) return <p style={{ color: "var(--text-body)" }}>All done!</p>;

  const current = dueItems[currentIndex];
  const choices = [current.meaning];
  while (choices.length < 4) {
    const fake = "Fake meaning " + Math.random().toFixed(2);
    if (!choices.includes(fake)) choices.push(fake);
  }
  const shuffled = choices.sort(() => Math.random() - 0.5);

  const handleSubmit = () => { nextCard(); };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-heading)" }}>
        {current.word}
      </h2>
      <div className="space-y-2 mb-4">
        {shuffled.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-3 p-3 cursor-pointer transition-all"
            style={{
              backgroundColor: selected === opt ? "var(--brand-softer)" : "var(--neutral-secondary-medium)",
              border: selected === opt ? "2px solid var(--border-brand-subtle)" : "2px solid transparent",
              borderRadius: "var(--radius-default)",
            }}
          >
            <input
              type="radio"
              value={opt}
              checked={selected === opt}
              onChange={(e) => setSelected(e.target.value)}
              className="w-4 h-4 accent-[var(--brand)]"
            />
            <span className="text-sm font-bold" style={{ color: "var(--text-heading)" }}>
              {opt}
            </span>
          </label>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="font-bold uppercase tracking-wide"
        style={{
          padding: "12px 24px",
          backgroundColor: "var(--brand)",
          color: "#FFFFFF",
          borderRadius: "var(--radius-default)",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
}
