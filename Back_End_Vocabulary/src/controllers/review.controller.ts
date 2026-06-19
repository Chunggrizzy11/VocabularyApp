import { Request, Response } from "express";
import { reviewService } from "../services/review.service";
import { success, error } from "../utils/response";

export const reviewController = {
  getDueItems: async (_req: Request, res: Response) => {
    try {
      const items = await reviewService.getDueItems();
      return success(res, items);
    } catch (e: any) { return error(res, e.message); }
  },
  submitResult: async (req: Request, res: Response) => {
    try {
      const { vocabularyId, rating } = req.body;
      if (!vocabularyId || !rating) return error(res, "vocabularyId and rating required", 400);
      await reviewService.submitResult(vocabularyId, rating);
      return success(res, { message: "Review recorded" });
    } catch (e: any) { return error(res, e.message); }
  },
};
