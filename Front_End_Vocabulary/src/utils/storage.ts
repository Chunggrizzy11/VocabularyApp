const STORAGE_KEYS = {
  TOPICS: "vocabulary_topics",
  VOCABULARY: "vocabulary_words",
  REVIEWS: "vocabulary_reviews",
  STATS: "vocabulary_stats",
  SETTINGS: "vocabulary_settings",
} as const;

export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error saving to localStorage:", e);
  }
}

export function removeItem(key: string): void {
  localStorage.removeItem(key);
}

export function clearAll(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}

export { STORAGE_KEYS };