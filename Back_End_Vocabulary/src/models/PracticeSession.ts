import mongoose, { Schema } from "mongoose";
import type { IPracticeSession, PracticeWord } from "../interfaces/practiceSession.interface";

const practiceWordSchema = new Schema<PracticeWord>(
  {
    word: { type: String, required: true, trim: true },
    phonetic: { type: String, default: "" },
    meaning: { type: String, required: true },
    recognizedText: { type: String, default: "" },
    score: { type: Number, required: true, min: 0, max: 100 },
    attemptedAt: { type: Date, required: true, default: Date.now },
  },
  { _id: false }
);

const practiceSessionSchema = new Schema<IPracticeSession>(
  {
    topicId: { type: Schema.Types.ObjectId, ref: "Topic", default: null, index: true },
    topicName: { type: String },
    words: { type: [practiceWordSchema], required: true },
    averageScore: { type: Number, required: true, min: 0, max: 100 },
    totalWords: { type: Number, required: true, min: 0 },
    startedAt: { type: Date, required: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

practiceSessionSchema.index({ completedAt: -1 });
practiceSessionSchema.index({ topicId: 1, completedAt: -1 });

export const PracticeSession = mongoose.model<IPracticeSession>("PracticeSession", practiceSessionSchema);
