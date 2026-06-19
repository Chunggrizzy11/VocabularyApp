import { Request, Response } from "express";
import { statisticsService } from "../services/statistics.service";
import { success, error } from "../utils/response";

export const statisticsController = {
  getUserStats: async (_req: Request, res: Response) => {
    try {
      const stats = await statisticsService.getUserStats();
      return success(res, stats);
    } catch (e: any) { return error(res, e.message); }
  },
  getLearningProgress: async (req: Request, res: Response) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const progress = await statisticsService.getLearningProgress(days);
      return success(res, progress);
    } catch (e: any) { return error(res, e.message); }
  },
  getHeatmapData: async (req: Request, res: Response) => {
    try {
      const year = parseInt(req.query.year as string) || undefined;
      const data = await statisticsService.getHeatmapData(year);
      return success(res, data);
    } catch (e: any) { return error(res, e.message); }
  },
};
