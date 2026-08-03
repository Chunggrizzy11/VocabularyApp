import mongoose, { Schema } from "mongoose";
import type { IQuizResult } from "../interfaces/quizResult.interface";

const quizResultSchema = new Schema<IQuizResult>(
  {
    userId: { type: String, required: true, index: true },
    score: { type: Number, required: true, min: 0 },
    totalQuestions: { type: Number, required: true, min: 1 },
    topicId: { type: Schema.Types.ObjectId, ref: "Topic", default: null },
    completedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

quizResultSchema.index({ userId: 1, completedAt: -1 });

export const QuizResult = mongoose.model<IQuizResult>("QuizResult", quizResultSchema);
