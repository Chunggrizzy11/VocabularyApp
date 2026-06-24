import { useEffect, useRef } from "react";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import Icon from "../common/Icon";

interface Props {
  onTranscript: (text: string) => void;
  disabled?: boolean;
  size?: number;
}

export default function MicrophoneButton({ onTranscript, disabled = false, size = 64 }: Props) {
  const { isListening, transcript, error, startListening, stopListening, isSupported, resetTranscript } =
    useSpeechRecognition();
  const transcriptSentRef = useRef(false);

  useEffect(() => {
    if (transcript && !isListening && !transcriptSentRef.current) {
      transcriptSentRef.current = true;
      onTranscript(transcript);
    }
    if (!transcript) {
      transcriptSentRef.current = false;
    }
  }, [transcript, isListening, onTranscript]);

  const handleToggle = () => {
    if (!isSupported) return;
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      transcriptSentRef.current = false;
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <div className="text-center">
        <div
          className="mx-auto rounded-full flex items-center justify-center"
          style={{
            width: size,
            height: size,
            backgroundColor: "var(--neutral-secondary-medium)",
            opacity: 0.4,
          }}
        >
          <Icon name="mic" size={size * 0.45} color="var(--text-body-subtle)" />
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--text-body-subtle)" }}>
          Mic not supported
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleToggle}
        disabled={disabled}
        aria-label={isListening ? "Stop recording" : "Start recording"}
        title={isListening ? "Click to stop" : "Click to speak"}
        className="rounded-full flex items-center justify-center transition-all cursor-pointer border-none"
        style={{
          width: size,
          height: size,
          backgroundColor: isListening ? "#ef4444" : "var(--brand)",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: isListening
            ? "0 0 0 4px rgba(239, 68, 68, 0.3)"
            : "0 4px 0 var(--shadow-btn-brand)",
          transition: "all 150ms ease-out",
          animation: isListening ? "speakingPulse 1.2s ease-in-out infinite" : "none",
        }}
      >
        <Icon name="mic" size={size * 0.45} color="#ffffff" />
      </button>
      {isListening && (
        <span className="text-sm font-semibold animate-pulse" style={{ color: "#ef4444" }}>
          Listening...
        </span>
      )}
      {error && (
        <p className="text-xs" style={{ color: "var(--danger)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
