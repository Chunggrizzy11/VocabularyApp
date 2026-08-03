import mongoose, { Schema, Document } from "mongoose";

export interface INotebookWord extends Document {
  notebookId: mongoose.Types.ObjectId;
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

const notebookWordSchema = new Schema<INotebookWord>({
  notebookId: { type: Schema.Types.ObjectId, ref: "Notebook", required: true, index: true },
  userId: { type: String, required: true, index: true },
  word: { type: String, required: true, trim: true },
  meaning: { type: String, required: true },
  phonetic: { type: String },
  partOfSpeech: { type: String, required: true },
  example: { type: String },
  exampleTranslation: { type: String },
  imageUrl: { type: String },
  audioUrl: { type: String },
  srsLevel: { type: Number, default: 0 },
  nextReviewAt: { type: Date, default: null },
  interval: { type: Number, default: 0 },
  easeFactor: { type: Number, default: 2.5 },
  reviewCount: { type: Number, default: 0 },
  addedAt: { type: Date, default: Date.now },
});

export const NotebookWord = mongoose.model<INotebookWord>("NotebookWord", notebookWordSchema);
