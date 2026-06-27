import { Request, Response } from "express";
import { reviewService } from "../services/review.service";
import { success, error } from "../utils/response";

export const reviewController = {
  getDueItems: async (req: Request, res: Response) => {
    try {
      const items = await reviewService.getDueItems(req.userId);
      success(res, items);
    } catch (e: any) { error(res, e.message); }
  },
  submitResult: async (req: Request, res: Response) => {
    try {
      const { vocabularyId, rating } = req.body;
      if (!vocabularyId || !rating) error(res, "vocabularyId and rating required", 400);
      await reviewService.submitResult(vocabularyId, rating, req.userId);
      success(res, { message: "Review recorded" });
    } catch (e: any) { error(res, e.message); }
  },
};
