import { Request, Response } from "express";
import { studySessionService } from "../services/studySession.service";
import { success, error } from "../utils/response";

export const studySessionController = {
  logSession: async (req: Request, res: Response) => {
    try {
      const { activityType, startedAt, endedAt, topicId } = req.body;
      const session = await studySessionService.logSession({
        userId: req.userId!,
        activityType,
        startedAt: startedAt || new Date().toISOString(),
        endedAt,
        topicId,
      });
      success(res, session, 201);
    } catch (e: any) {
      error(res, e.message);
    }
  },

  getStats: async (req: Request, res: Response) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const totalTimeMs = await studySessionService.getTotalTimeMs(req.userId!);
      const dailyBreakdown = await studySessionService.getDailyBreakdown(req.userId!, days);
      success(res, { totalTimeMs, dailyBreakdown });
    } catch (e: any) {
      error(res, e.message);
    }
  },
};
