import { useRef, useCallback, useState } from "react";
import { useVolumeStore } from "../store/volume.store";

/** Cache: word → audio URL string only (no DOM elements) */
const urlCache = new Map<string, string>();
const inFlight = new Set<string>();

const DICTIONARY_API = "https://api.dictionaryapi.dev/api/v2/entries/en";

/**
 * Hook that fetches pronunciation audio from the Free Dictionary API,
 * caches the URL, and plays with volume 0-150% via Web Audio API.
 */
export function usePronunciation() {
  const [playing, setPlaying] = useState<string | null>(null);
  const currentAudio = useRef<HTMLAudioElement | null>(null);

  const volume = useVolumeStore((s) => s.volume);

  const stop = useCallback(() => {
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current.currentTime = 0;
      currentAudio.current = null;
    }
    setPlaying(null);
  }, []);

  /** Fetch audio URL from API, return cached one on repeat */
  const fetchAudioUrl = useCallback(async (word: string): Promise<string | null> => {
    const lower = word.toLowerCase().trim();
    if (!lower) return null;

    const cached = urlCache.get(lower);
    if (cached) return cached;
    if (inFlight.has(lower)) return null; // avoid duplicate fetches

    inFlight.add(lower);
    try {
      const res = await fetch(`${DICTIONARY_API}/${encodeURIComponent(lower)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: DictionaryEntry[] = await res.json();
      const entry = data[0];
      if (!entry) throw new Error("No entry");

      const phonetic = entry.phonetics?.find((p) => p.audio);
      const audioUrl = phonetic?.audio;
      if (!audioUrl) throw new Error("No audio");

      const fullUrl = audioUrl.startsWith("//") ? `https:${audioUrl}` : audioUrl;
      urlCache.set(lower, fullUrl);
      return fullUrl;
    } catch (err) {
      console.warn(`[Pronunciation] Failed for "${lower}":`, err);
      return null;
    } finally {
      inFlight.delete(lower);
    }
  }, []);

  const play = useCallback(
    async (word: string): Promise<void> => {
      const lower = word.toLowerCase().trim();
      if (!lower) return;

      stop();

      const gainValue = Math.max(0, Math.min(1.5, volume / 100));
      if (gainValue === 0) return;

      // Get audio URL
      let audioUrl = urlCache.get(lower);
      if (!audioUrl) {
        audioUrl = await fetchAudioUrl(lower);
        if (!audioUrl) return; // failed
      }

      // Create fresh Audio element each time
      const audio = new Audio(audioUrl);
      audio.currentTime = 0;
      currentAudio.current = audio;

      try {
        setPlaying(lower);

        if (gainValue > 1) {
          // Web Audio API for boost > 100%
          const ctx = new AudioContext();
          if (ctx.state === "suspended") await ctx.resume();

          const source = ctx.createMediaElementSource(audio);
          const gain = ctx.createGain();
          gain.gain.value = gainValue;

          source.connect(gain);
          gain.connect(ctx.destination);

          audio.onended = () => {
            source.disconnect();
            gain.disconnect();
            ctx.close();
            setPlaying(null);
            // Recreate the audio ref for next play
            currentAudio.current = null;
          };

          await audio.play();
        } else {
          audio.volume = gainValue;
          audio.onended = () => {
            setPlaying(null);
            currentAudio.current = null;
          };
          await audio.play();
        }
      } catch (err: any) {
        currentAudio.current = null;
        setPlaying(null);
        if (err.name === "NotAllowedError") {
          console.warn("[Pronunciation] Autoplay blocked — user interaction needed");
        }
      }
    },
    [stop, volume, fetchAudioUrl]
  );

  return { play, stop, playing };
}

interface PhoneticEntry {
  audio?: string;
  text?: string;
}

interface DictionaryEntry {
  word: string;
  phonetics: PhoneticEntry[];
}
