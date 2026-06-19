import { useState } from "react";
import { useReviewStore } from "../../store/review.store";
import Icon from "../common/Icon";

export default function ListeningQuiz() {
  const { dueItems, currentIndex, isLoading, nextCard } = useReviewStore();
  const [playing, setPlaying] = useState(false);

  if (isLoading) return <p style={{ color: "var(--text-body)" }}>Loading...</p>;
  if (currentIndex >= dueItems.length) return <p style={{ color: "var(--text-body)" }}>All done!</p>;

  const handlePlay = () => setPlaying(true);
  const handleSubmit = () => {
    setPlaying(false);
    nextCard();
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-heading)" }}>
        Listen and type the word
      </h2>
      <button
        onClick={handlePlay}
        className="inline-flex items-center gap-2 font-bold uppercase tracking-wide cursor-pointer"
        style={{
          padding: "14px 24px",
          backgroundColor: "var(--success)",
          color: "#FFFFFF",
          borderRadius: "var(--radius-default)",
          boxShadow: "0 4px 0 var(--brand-strong)",
          border: "none",
          fontSize: "14px",
          letterSpacing: "0.8px",
        }}
      >
        <Icon name="volume-high" size={18} color="#FFFFFF" /> Play Audio
      </button>

      {playing && <p className="mt-2 text-sm" style={{ color: "var(--text-body)" }}>Audio playing...</p>}

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleSubmit}
          className="font-bold uppercase tracking-wide cursor-pointer"
          style={{
            padding: "12px 24px",
            backgroundColor: "var(--brand)",
            color: "#FFFFFF",
            borderRadius: "var(--radius-default)",
            boxShadow: "0 4px 0 var(--brand-strong)",
            border: "none",
            fontSize: "14px",
            letterSpacing: "0.8px",
          }}
        >
          Got it
        </button>
        <button
          onClick={handleSubmit}
          className="font-bold uppercase tracking-wide cursor-pointer"
          style={{
            padding: "12px 24px",
            backgroundColor: "var(--danger)",
            color: "#FFFFFF",
            borderRadius: "var(--radius-default)",
            boxShadow: "0 4px 0 var(--danger-strong)",
            border: "none",
            fontSize: "14px",
            letterSpacing: "0.8px",
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
