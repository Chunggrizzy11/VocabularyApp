import { useVolumeStore } from "../../store/volume.store";
import Icon from "./Icon";
import type { IconName } from "./Icon";

export default function VolumeSlider() {
  const volume = useVolumeStore((s) => s.volume);
  const setVolume = useVolumeStore((s) => s.setVolume);
  const toggleMute = useVolumeStore((s) => s.toggleMute);

  const isMuted = volume === 0;
  const volumeIcon: IconName = isMuted ? "volume-mute" : volume <= 50 ? "volume-low" : "volume-high";

  const fillColor = isMuted ? "var(--danger)" : "var(--brand)";

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <button
        onClick={toggleMute}
        title={isMuted ? "Unmute" : "Mute"}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        className="shrink-0 flex items-center justify-center cursor-pointer"
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "var(--radius-default)",
          background: "var(--neutral-secondary-medium)",
          border: "2px solid var(--border-default)",
          cursor: "pointer",
        }}
      >
        <Icon name={volumeIcon} size={14} color="var(--text-heading)" />
      </button>

      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={(e) => setVolume(parseInt(e.target.value, 10))}
        aria-label={`Volume: ${volume}%`}
        className="volume-slider"
        style={{
          width: "80px",
          height: "4px",
          WebkitAppearance: "none",
          appearance: "none",
          background: `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${volume}%, var(--neutral-tertiary-medium) ${volume}%, var(--neutral-tertiary-medium) 100%)`,
          borderRadius: "2px",
          outline: "none",
          cursor: "pointer",
          border: "none",
        }}
      />

      <span
        className="shrink-0 tabular-nums font-bold"
        style={{
          fontSize: "10px",
          color: "var(--text-body-subtle)",
          width: "22px",
          textAlign: "right",
        }}
      >
        {volume}%
      </span>
    </div>
  );
}