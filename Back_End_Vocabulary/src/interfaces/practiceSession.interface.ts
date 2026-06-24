import { Document, Types } from "mongoose";

export interface PracticeWord {
  word: string;
  phonetic: string;
  meaning: string;
  recognizedText: string;
  score: number;
  attemptedAt: Date;
}

export interface IPracticeSession extends Document {
  topicId: Types.ObjectId | null;
  topicName?: string;
  words: PracticeWord[];
  averageScore: number;
  totalWords: number;
  startedAt: Date;
  completedAt: Date;
}
