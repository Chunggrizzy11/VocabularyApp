import { useState, useRef } from "react";
import Icon from "../common/Icon";

interface Props {
  word?: string;
  audioUrl?: string;
}

export default function VocabularyAudio({ audioUrl }: Props) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = () => {
    if (!audioUrl) return;
    if (audioRef.current) {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
    }
  };

  return (
    <div className="mt-3">
      <audio ref={audioRef} src={audioUrl} onEnded={() => setPlaying(false)} />
      <button
        onClick={playing ? stop : play}
        className="inline-flex items-center gap-2 text-sm font-bold transition-all cursor-pointer"
        style={{
          color: playing ? "var(--fg-brand-strong)" : "var(--fg-brand)",
          background: playing ? "var(--brand-softer)" : "var(--neutral-secondary-medium)",
          borderRadius: "var(--radius-default)",
          padding: "10px 16px",
          border: "2px solid " + (playing ? "var(--border-brand-subtle)" : "var(--border-default)"),
          textTransform: "uppercase",
          letterSpacing: "0.6px",
        }}
      >
        <Icon name={playing ? "volume-high" : "volume-low"} size={18} />
        <span>{playing ? "Playing..." : "Listen"}</span>
      </button>
    </div>
  );
}
