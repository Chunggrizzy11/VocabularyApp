import { useState } from "react";
import Phonetic from "../common/Phonetic";

interface Props {
  word: string;
  meaning: string;
  phonetic?: string;
}

export default function Flashcard({ word, meaning, phonetic }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped(!flipped);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={flipped ? `Meaning: ${meaning}. Tap to flip back.` : `Word: ${word}. Tap to reveal meaning.`}
      className="select-none cursor-pointer"
      style={{
        minHeight: "220px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "28px 16px",
        borderRadius: "var(--radius-default)",
        background: flipped ? "var(--brand-softer)" : "var(--neutral-primary-soft)",
        boxShadow: flipped ? "0 2px 0 var(--border-brand-subtle)" : "var(--shadow-xs)",
        border: flipped ? "2px solid var(--border-brand-subtle)" : "2px solid var(--border-default)",
        transition: "all 150ms ease-out",
      }}
    >
      {!flipped ? (
        <>
          <span
            className="badge"
            style={{ marginBottom: "16px" }}
          >
            Word
          </span>
          <h2
            className="font-extrabold leading-tight"
            style={{
              color: "var(--text-heading)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            {word}
          </h2>
          <p className="text-sm mt-2" style={{ color: "var(--text-body-subtle)" }}>
            <Phonetic word={word} fallback={phonetic} />
          </p>
          <p className="text-xs font-bold mt-8 uppercase tracking-wide" style={{ color: "var(--text-body-subtle)" }}>
            Tap to reveal meaning
          </p>
        </>
      ) : (
        <>
          <span
            className="badge"
            style={{
              backgroundColor: "var(--success-soft)",
              color: "var(--fg-success-strong)",
              borderColor: "var(--border-success-subtle)",
              marginBottom: "16px",
            }}
          >
            Meaning
          </span>
          <h3
            className="font-bold leading-tight"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              color: "var(--text-heading)",
            }}
          >
            {meaning}
          </h3>
          <p className="text-xs font-bold mt-8 uppercase tracking-wide" style={{ color: "var(--text-body-subtle)" }}>
            Tap to flip back
          </p>
        </>
      )}
    </div>
  );
}
