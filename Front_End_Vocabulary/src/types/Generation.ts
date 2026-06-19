/** A word generated from external dictionary APIs (not yet saved) */
export interface GeneratedWord {
  word: string;
  phonetic: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  pronunciation: string;
}

/** Request body for preview endpoint */
export interface GeneratePreviewRequest {
  topic: string;
  count?: number;
  difficulty?: "easy" | "medium" | "hard";
}

/** Request body for save endpoint */
export interface GenerateSaveRequest {
  topicId: string;
  topic: string;
  count?: number;
  difficulty?: string;
}

/** Response from the save endpoint */
export interface GenerateSaveResponse {
  generated: number;
  words: import("./Vocabulary").VocabularyWord[];
}
