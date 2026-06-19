import mongoose, { Schema } from "mongoose";
import type { IQuizQuestion } from "../interfaces/quiz.interface";

const quizQuestionSchema = new Schema<IQuizQuestion>({
  vocabularyId: { type: String, required: true },
  type: { type: String, default: "multiple_choice" },
  question: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
});

export const Quiz = mongoose.model<IQuizQuestion>("Quiz", quizQuestionSchema);
