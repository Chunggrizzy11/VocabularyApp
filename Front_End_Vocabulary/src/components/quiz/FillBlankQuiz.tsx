import { useState } from "react";
import { useReviewStore } from "../../store/review.store";
import type { SRSRating } from "../../types/Review";

export default function FillBlankQuiz() {
  const {
    dueItems,
    currentIndex,
    isLoading,
    submitRating,
    nextCard,
  } = useReviewStore();

  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  if (isLoading) return <p style={{ color: "var(--text-muted)" }}>Loading...</p>;
  if (currentIndex >= dueItems.length) return <p style={{ color: "var(--text-muted)" }}>All done!</p>;

  const current = dueItems[currentIndex];

  const handleCheck = async () => {
    const rating: SRSRating =
      answer.trim().toLowerCase() === current.meaning.trim().toLowerCase()
        ? "good"
        : "again";
    await submitRating(rating);
    setAnswer("");
    setShowAnswer(false);
    nextCard();
  };

  return (
    <div className="card p-6" style={{ boxShadow: "var(--shadow)" }}>
      <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
        {current.sentence?.replace(/_____/g, "_____") ?? `${current.word} _____`}
      </h2>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="input mb-4"
        placeholder="Your answer"
      />
      <button
        onClick={handleCheck}
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
      {showAnswer && (
        <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
          Answer: {current.meaning}
        </p>
      )}
    </div>
  );
}
