export interface INotebook {
  _id: string;
  userId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface INotebookWord {
  _id: string;
  notebookId: string;
  userId: string;
  word: string;
  meaning: string;
  phonetic?: string;
  partOfSpeech: string;
  example: string;
  exampleTranslation: string;
  imageUrl?: string;
  audioUrl?: string;
  srsLevel: number;
  nextReviewAt: string | null;
  interval: number;
  easeFactor: number;
  reviewCount: number;
  addedAt: string;
}

export interface CreateNotebookDTO {
  name: string;
  description?: string;
}

export interface UpdateNotebookDTO {
  name?: string;
  description?: string;
}

export interface CreateNotebookWordDTO {
  word: string;
  meaning: string;
  phonetic?: string;
  partOfSpeech?: string;
  example?: string;
  exampleTranslation?: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface NotebookStats {
  total: number;
  mastered: number;
  due: number;
  learning: number;
}