export const SRS_LEVELS = [
  { level: 0, name: "New", intervalDays: 0, multiplier: 0 },
  { level: 1, name: "Again", intervalDays: 1, multiplier: 1 },
  { level: 2, name: "Hard", intervalDays: 3, multiplier: 1.2 },
  { level: 3, name: "Good", intervalDays: 7, multiplier: 1.5 },
  { level: 4, name: "Easy", intervalDays: 14, multiplier: 2 },
] as const;
