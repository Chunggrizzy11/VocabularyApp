import { useCallback, useRef } from "react";

// ── AudioContext Singleton (theo skill rules) ──
let audioCtx: AudioContext | null = null;
function getAudioContext(): AudioContext {
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

/**
 * UI Sound hook — success + error sounds from ui-sound-design skill recipes.
 *
 * Success: ascending major third (sine) — satisfying, positive
 * Error: descending buzzy tone (sawtooth → lowpass) — urgent, alert
 *
 * Rules followed:
 * - context-singleton
 * - gain-no-zero-target (always 0.001)
 * - exponential-over-linear ramps
 * - volume-max-0.8
 * - scheduling-capture-once
 */
export function useUISound() {
  const disabled = useRef(false);

  const playCorrect = useCallback(() => {
    if (disabled.current) return;
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const volume = 0.3;

    // Two ascending notes: C5 → E5 (major third interval 1.25)
    [0, 1].forEach((i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + i * 0.18; // noteDuration(0.12) + gap(0.06)
      const freq = 523 * Math.pow(1.25, i);

      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.13);
    });
  }, []);

  const playWrong = useCallback(() => {
    if (disabled.current) return;
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const volume = 0.2;

    // Descending sawtooth through lowpass filter
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.25);

    filter.type = "lowpass";
    filter.frequency.value = 1500;
    filter.Q.value = 1;

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  }, []);

  return { playCorrect, playWrong };
}
