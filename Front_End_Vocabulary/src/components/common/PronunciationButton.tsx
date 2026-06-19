import { usePronunciation } from "../../hooks/usePronunciation";
import Icon from "./Icon";

interface Props {
  word: string;
  /** Override the audio source URL if already known */
  audioUrl?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Show label text next to icon */
  showLabel?: boolean;
  /** Callback when audio starts/stops */
  onPlayStateChange?: (playing: boolean) => void;
}

export default function PronunciationButton({
  word,
  size = "md",
  showLabel = false,
}: Props) {
  const { play, playing } = usePronunciation();
  const isPlaying = playing === word.toLowerCase().trim();

  const sizeMap = {
    sm: { button: "36px", icon: "14px", gap: "6px" },
    md: { button: "40px", icon: "18px", gap: "8px" },
    lg: { button: "48px", icon: "22px", gap: "8px" },
  };

  const s = sizeMap[size];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    play(word);
  };

  return (
    <button
      onClick={handleClick}
      title={isPlaying ? "Playing..." : `Listen to "${word}"`}
      aria-label={isPlaying ? `Playing pronunciation of ${word}` : `Play pronunciation of ${word}`}
      className="inline-flex items-center justify-center font-bold transition-all shrink-0 cursor-pointer"
      style={{
        height: s.button,
        padding: "0 12px",
        gap: s.gap,
        fontSize: "12px",
        borderRadius: "var(--radius-default)",
        backgroundColor: isPlaying ? "var(--brand-softer)" : "var(--neutral-secondary-medium)",
        color: isPlaying ? "var(--fg-brand-strong)" : "var(--text-heading)",
        border: isPlaying ? "2px solid var(--border-brand-subtle)" : "2px solid var(--border-default)",
        cursor: "pointer",
        textTransform: "uppercase",
        letterSpacing: "0.6px",
      }}
    >
      <span
        className={isPlaying ? "animate-pulse" : ""}
        style={{ lineHeight: 1, display: "flex", alignItems: "center" }}
      >
        <Icon name={isPlaying ? "volume-high" : "volume-low"} size={parseInt(s.icon)} />
      </span>
      {showLabel && <span>{isPlaying ? "Playing" : "Listen"}</span>}
    </button>
  );
}
