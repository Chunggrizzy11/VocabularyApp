import { quizRepository } from "../repositories/quiz.repository";

export const quizService = {
  getAll: () => quizRepository.findAll(),
  getById: (id: string) => quizRepository.findById(id),
};
