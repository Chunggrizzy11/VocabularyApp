import { Request, Response } from "express";
import { quizService } from "../services/quiz.service";
import { success, error } from "../utils/response";

export const quizController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const quizzes = await quizService.getAll();
      success(res, quizzes);
    } catch (e: any) { error(res, e.message); }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const quiz = await quizService.getById(req.params.id as string);
      if (!quiz) error(res, "Quiz not found", 404);
      success(res, quiz);
    } catch (e: any) { error(res, e.message); }
  },
};
