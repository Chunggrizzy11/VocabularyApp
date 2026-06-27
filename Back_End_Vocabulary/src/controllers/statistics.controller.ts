import { Request, Response } from "express";
import { statisticsService } from "../services/statistics.service";
import { success, error } from "../utils/response";

export const statisticsController = {
  getUserStats: async (req: Request, res: Response) => {
    try {
      const stats = await statisticsService.getUserStats(req.userId!);
      success(res, stats);
    } catch (e: any) { error(res, e.message); }
  },
  getLearningProgress: async (req: Request, res: Response) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const progress = await statisticsService.getLearningProgress(req.userId!, days);
      success(res, progress);
    } catch (e: any) { error(res, e.message); }
  },
  getHeatmapData: async (req: Request, res: Response) => {
    try {
      const year = parseInt(req.query.year as string) || undefined;
      const data = await statisticsService.getHeatmapData(req.userId!, year);
      success(res, data);
    } catch (e: any) { error(res, e.message); }
  },
};
