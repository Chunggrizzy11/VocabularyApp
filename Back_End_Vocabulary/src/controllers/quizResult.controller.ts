import { Request, Response } from "express";
import { quizResultService } from "../services/quizResult.service";
import { success, error } from "../utils/response";

export const quizResultController = {
  save: async (req: Request, res: Response) => {
    try {
      const { score, totalQuestions, topicId } = req.body;
      if (score == null || totalQuestions == null) {
        error(res, "score and totalQuestions required", 400);
        return;
      }
      const result = await quizResultService.save({
        userId: req.userId!,
        score,
        totalQuestions,
        topicId,
      });
      success(res, result, 201);
    } catch (e: any) {
      error(res, e.message);
    }
  },
};
