import { Request, Response } from "express";
import { quizService } from "../services/quiz.service";
import { success, error } from "../utils/response";

export const quizController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const quizzes = await quizService.getAll();
      return success(res, quizzes);
    } catch (e: any) { return error(res, e.message); }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const quiz = await quizService.getById(req.params.id as string);
      if (!quiz) return error(res, "Quiz not found", 404);
      return success(res, quiz);
    } catch (e: any) { return error(res, e.message); }
  },
};
