import { create } from "zustand";

interface VolumeState {
  /** Volume level 0-100 (cap at 100 to avoid audio distortion) */
  volume: number;
  /** Volume before mute (for restore) */
  prevVolume: number;
  /** Set volume directly */
  setVolume: (v: number) => void;
  /** Toggle mute (store 0 / restore previous) */
  toggleMute: () => void;
  /** Load from localStorage on init */
  _hydrated: boolean;
}

export const useVolumeStore = create<VolumeState>((set, get) => ({
  volume: 100,
  prevVolume: 100,
  _hydrated: false,

  setVolume: (v: number) => {
    const clamped = Math.max(0, Math.min(100, v));
    set({ volume: clamped, prevVolume: clamped > 0 ? clamped : get().prevVolume, _hydrated: true });
    try {
      localStorage.setItem("parroto_volume", String(clamped));
    } catch { /* ignore */ }
  },

  toggleMute: () => {
    const { volume, prevVolume } = get();
    if (volume > 0) {
      set({ volume: 0, _hydrated: true });
      try { localStorage.setItem("parroto_volume", "0"); } catch { /* ignore */ }
    } else {
      const restore = prevVolume || 100;
      set({ volume: restore, _hydrated: true });
      try { localStorage.setItem("parroto_volume", String(restore)); } catch { /* ignore */ }
    }
  },
}));

/** Call once at app startup to hydrate volume from localStorage */
export function hydrateVolume() {
  const { setVolume, _hydrated } = useVolumeStore.getState();
  if (_hydrated) return;
  try {
    const saved = localStorage.getItem("parroto_volume");
    if (saved !== null) {
      const v = parseInt(saved, 10);
      if (!isNaN(v)) setVolume(v);
    }
  } catch { /* ignore */ }
}
