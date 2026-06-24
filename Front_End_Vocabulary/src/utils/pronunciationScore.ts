import { SCORE_THRESHOLDS, COLORS_BY_SCORE } from "../constants/speaking";

export function levenshteinDistance(a: string, b: string): number {
  const an = a.length;
  const bn = b.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= an; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= bn; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= an; i++) {
    for (let j = 1; j <= bn; j++) {
      const cost = a[i - 1].toLowerCase() === b[j - 1].toLowerCase() ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[an][bn];
}

export function calculatePronunciationScore(
  target: string,
  recognized: string
): number {
  const t = target.trim().toLowerCase();
  const r = recognized.trim().toLowerCase();
  if (!t || !r) return 0;

  const maxLen = Math.max(t.length, r.length);
  const distance = levenshteinDistance(t, r);
  const rawScore = (1 - distance / maxLen) * 100;
  return Math.round(Math.max(0, Math.min(100, rawScore)));
}

export interface ScoreLabelResult {
  label: string;
  color: string;
}

export function getScoreLabel(score: number): ScoreLabelResult {
  if (score >= SCORE_THRESHOLDS.EXCELLENT)
    return { label: "Excellent!", color: COLORS_BY_SCORE.excellent };
  if (score >= SCORE_THRESHOLDS.GOOD)
    return { label: "Good", color: COLORS_BY_SCORE.good };
  if (score >= SCORE_THRESHOLDS.FAIR)
    return { label: "Fair", color: COLORS_BY_SCORE.fair };
  return { label: "Try Again", color: COLORS_BY_SCORE.poor };
}
