export const SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 70,
  FAIR: 50,
} as const;

export const SPEAKING_MODES = {
  TOPIC: "topic" as const,
  ALL: "all" as const,
  DIFFICULT: "difficult" as const,
};

export const DEFAULT_SESSION_SIZE = 20;

export const COLORS_BY_SCORE = {
  excellent: "#22c55e",
  good: "#3b82f6",
  fair: "#eab308",
  poor: "#ef4444",
} as const;
