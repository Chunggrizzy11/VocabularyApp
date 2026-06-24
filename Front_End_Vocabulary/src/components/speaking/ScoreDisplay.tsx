import { useMemo } from "react";
import { getScoreLabel } from "../../utils/pronunciationScore";
import Icon from "../common/Icon";

interface Props {
  score: number;
  targetWord: string;
  recognizedText: string;
  onNext: () => void;
  onAgain: () => void;
  onListenAgain: () => void;
}

export default function ScoreDisplay({ score, targetWord, recognizedText, onNext, onAgain, onListenAgain }: Props) {
  const { label, color } = useMemo(() => getScoreLabel(score), [score]);

  return (
    <div className="text-center">
      <h3 className="text-[20px] font-extrabold mb-3" style={{ color: "var(--text-heading)" }}>
        Pronunciation Score
      </h3>

      <div className="relative mx-auto mb-4 flex items-center justify-center" style={{ width: 120, height: 120 }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="58" fill="none" stroke="currentColor" strokeWidth="4"
            style={{ color: "var(--neutral-tertiary-medium)" }} />
          <circle cx="60" cy="60" r="58" fill="none" stroke={color} strokeWidth="6"
            strokeDasharray="360" strokeDashoffset={360 - (score / 100) * 360}
            strokeLinecap="round" transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dashoffset 0.5s ease-out" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[32px] font-extrabold" style={{ color }}>{score}</span>
          <span className="text-[11px] font-bold uppercase tracking-wide mt-0.5" style={{ color }}>/100</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-bold mb-1" style={{ color: "var(--text-body-subtle)" }}>You said:</p>
        <p className="text-base font-semibold italic" style={{ color: "var(--text-body)" }}>"{recognizedText}"</p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-bold mb-1" style={{ color: "var(--text-body-subtle)" }}>Target word:</p>
        <p className="text-base font-semibold" style={{ color: "var(--text-heading)" }}>{targetWord}</p>
      </div>

      <div className="mb-4 p-3 rounded-[12px]" style={{ backgroundColor: "var(--success-soft)", border: "1px solid var(--border-success-subtle)" }}>
        <p className="font-bold text-sm" style={{ color }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-body-subtle)" }}>
          {label === "Excellent!" && "Great pronunciation! Keep it up!"}
          {label === "Good" && "Almost perfect! Minor differences."}
          {label === "Fair" && "Decent attempt. Try to match the target word."}
          {label === "Try Again" && "Keep practicing! You're getting there."}
        </p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button onClick={onListenAgain}
          className="flex items-center gap-2 px-4 py-2 font-bold text-xs uppercase tracking-wide rounded-[12px] border"
          style={{ backgroundColor: "var(--neutral-primary-soft)", borderColor: "var(--border-default)", color: "var(--text-heading)" }}>
          <Icon name="volume-low" size={16} color="var(--text-body)" /> Listen Again
        </button>
        <button onClick={onAgain}
          className="flex items-center gap-2 px-4 py-2 font-bold text-xs uppercase tracking-wide rounded-[12px]"
          style={{ backgroundColor: "var(--brand)", color: "#FFFFFF" }}>
          <Icon name="refresh" size={14} color="currentColor" /> Again
        </button>
        <button onClick={onNext}
          className="flex items-center gap-2 px-4 py-2 font-bold text-xs uppercase tracking-wide rounded-[12px]"
          style={{ backgroundColor: "var(--success)", color: "#FFFFFF" }}>
          Next <Icon name="chevron-right" size={14} color="currentColor" />
        </button>
      </div>
    </div>
  );
}
