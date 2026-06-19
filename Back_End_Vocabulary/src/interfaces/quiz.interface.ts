import { Document } from "mongoose";

export interface IQuizQuestion extends Document {
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
