import mongoose, { Schema, Document } from "mongoose";

export interface ILearningProgress extends Document {
  deviceId: string;
  vocabularyId: string;
  repetition: number;
  interval: number;
  easeFactor: number;
  nextReviewDate: Date;
  status: string;
}

const learningProgressSchema = new Schema<ILearningProgress>({
  deviceId: { type: String, default: "browser-device-001" },
  vocabularyId: { type: String, required: true },
  repetition: { type: Number, default: 0 },
  interval: { type: Number, default: 0 },
  easeFactor: { type: Number, default: 2.5 },
  nextReviewDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["new", "learning", "reviewing", "mastered"], default: "new" },
});

export const LearningProgress = mongoose.model<ILearningProgress>("LearningProgress", learningProgressSchema);
