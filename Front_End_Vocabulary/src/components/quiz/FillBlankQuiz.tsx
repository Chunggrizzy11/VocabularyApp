import { useState } from "react";
import { useReviewStore } from "../../store/review.store";

export default function FillBlankQuiz() {
  const { dueItems, currentIndex, isLoading, nextCard } = useReviewStore();
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  if (isLoading) return <p style={{ color: "var(--text-body)" }}>Loading...</p>;
  if (currentIndex >= dueItems.length) return <p style={{ color: "var(--text-body)" }}>All done!</p>;

  const current = dueItems[currentIndex];

  const handleCheck = () => {
    setShowAnswer(true);
    setTimeout(() => {
      setAnswer("");
      setShowAnswer(false);
      nextCard();
    }, 1500);
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-heading)" }}>
        {current.word} _____
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
      {showAnswer && (
        <p className="mt-3 text-sm" style={{ color: "var(--text-body)" }}>
          Answer: {current.meaning}
        </p>
      )}
    </div>
  );
}
