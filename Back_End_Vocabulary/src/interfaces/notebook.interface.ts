import { Document, Types } from "mongoose";

export interface INotebook extends Document {
  userId: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotebookWord extends Document {
  notebookId: Types.ObjectId;
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
  nextReviewAt: Date | null;
  interval: number;
  easeFactor: number;
  reviewCount: number;
  addedAt: Date;
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