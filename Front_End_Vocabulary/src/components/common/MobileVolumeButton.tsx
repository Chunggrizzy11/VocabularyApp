import { useState, useEffect, useRef } from "react";
import { useVolumeStore } from "../../store/volume.store";
import Icon from "./Icon";
import type { IconName } from "./Icon";

export default function MobileVolumeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const volume = useVolumeStore((s) => s.volume);
  const setVolume = useVolumeStore((s) => s.setVolume);
  const toggleMute = useVolumeStore((s) => s.toggleMute);

  const isMuted = volume === 0;
  const volumeIcon: IconName = isMuted ? "volume-mute" : volume <= 50 ? "volume-low" : "volume-high";

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle ESC key to close
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const fillColor = isMuted ? "var(--danger)" : "var(--brand)";

  return (
    <>
      {/* Floating button - chỉ hiện trên mobile */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed z-[50] flex items-center justify-center md:hidden"
        style={{
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 80px)",
          right: "16px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          backgroundColor: "var(--neutral-primary-soft)",
          border: "2px solid var(--border-default)",
          boxShadow: "var(--shadow-md)",
          cursor: "pointer",
          transition: "transform 150ms ease-out, box-shadow 150ms ease-out",
        }}
        aria-label={isMuted ? "Mở âm lượng" : "Điều chỉnh âm lượng"}
        aria-expanded={isOpen}
      >
        <Icon
          name={volumeIcon}
          size={20}
          color="var(--text-heading)"
        />
      </button>

      {/* Popover volume slider */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="fixed z-[50] md:hidden"
          style={{
            bottom: "calc(env(safe-area-inset-bottom, 0px) + 144px)",
            right: "16px",
            width: "280px",
            maxWidth: "calc(100vw - 32px)",
            backgroundColor: "var(--neutral-primary-soft)",
            border: "2px solid var(--border-default)",
            borderRadius: "var(--radius-default)",
            boxShadow: "var(--shadow-lg)",
            padding: "16px",
            animation: "fadeInUp 200ms ease-out forwards",
          }}
          role="dialog"
          aria-label="Điều chỉnh âm lượng"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={toggleMute}
              className="flex items-center justify-center shrink-0"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "var(--radius-default)",
                backgroundColor: "var(--neutral-secondary-medium)",
                border: "2px solid var(--border-default)",
                cursor: "pointer",
                transition: "background-color 150ms ease-out",
              }}
              aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            >
              <Icon
                name={volumeIcon}
                size={18}
                color="var(--text-heading)"
              />
            </button>

            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value, 10))}
              aria-label={`Âm lượng: ${volume}%`}
              role="slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={volume}
              className="volume-slider flex-1"
              style={{
                height: "6px",
                WebkitAppearance: "none",
                appearance: "none",
                background: `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${volume}%, var(--neutral-tertiary-medium) ${volume}%, var(--neutral-tertiary-medium) 100%)`,
                borderRadius: "3px",
                outline: "none",
                cursor: "pointer",
                border: "none",
              }}
            />

            <span
              className="shrink-0 tabular-nums font-bold"
              style={{
                fontSize: "12px",
                color: "var(--text-body)",
                width: "36px",
                textAlign: "right",
              }}
            >
              {volume}%
            </span>
          </div>
        </div>
      )}
    </>
  );
}