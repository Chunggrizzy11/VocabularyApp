import { api } from "./api";

export const quizResultService = {
  save: (data: { score: number; totalQuestions: number; topicId?: string }) =>
    api.post("/quiz-results", data).then((r: any) => r.data),
};
