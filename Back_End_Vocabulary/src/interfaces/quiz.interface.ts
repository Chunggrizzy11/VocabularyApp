import { Document } from "mongoose";

export interface IQuizQuestion extends Document {
  userId: string;
  vocabularyId: string;
  type: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizAnswerDTO {
  questionId: string;
  answer: string;
}
