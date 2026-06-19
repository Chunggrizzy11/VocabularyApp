import { api } from "./api";
import type { QuizQuestion } from "../types/Quiz";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const quizService = {
  getAll: () => api.get<ApiResponse<QuizQuestion[]>>("/quiz").then(r => r.data),
  getById: (id: string) => api.get<ApiResponse<QuizQuestion>>(`/quiz/${id}`).then(r => r.data),
};
