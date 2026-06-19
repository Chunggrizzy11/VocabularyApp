import { Quiz } from "../models/Quiz";
import type { IQuizQuestion } from "../interfaces/quiz.interface";

export const quizRepository = {
  findAll: async (): Promise<IQuizQuestion[]> => Quiz.find(),
  findById: async (id: string): Promise<IQuizQuestion | null> => Quiz.findById(id),
};
