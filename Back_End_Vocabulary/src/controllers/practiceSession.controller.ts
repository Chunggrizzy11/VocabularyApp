import { Request, Response } from "express";
import { practiceSessionService } from "../services/practiceSession.service";
import { success, error } from "../utils/response";

export const practiceSessionController = {
  async create(req: Request, res: Response) {
    try {
      const { words, topicId, topicName, startedAt } = req.body;
      if (!words || !Array.isArray(words) || words.length === 0) {
        error(res, "Words array is required", 400);
      }
      if (!startedAt) {
        error(res, "startedAt is required", 400);
      }
      const session = await practiceSessionService.create({
        words, topicId, topicName,
        startedAt: new Date(startedAt),
        userId: req.userId,
      });
      success(res, session, 201);
    } catch {
      error(res, "Failed to save practice session", 500);
    }
  },

  async getHistory(req: Request, res: Response) {
    try {
      const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
      const sessions = await practiceSessionService.getHistory(req.userId!, limit);
      success(res, sessions);
    } catch {
      error(res, "Failed to fetch practice history", 500);
    }
  },

  async getStats(req: Request, res: Response) {
    try {
      const topicId = req.query.topicId as string | undefined;
      const stats = await practiceSessionService.getStats(req.userId!, topicId);
      success(res, stats);
    } catch {
      error(res, "Failed to fetch practice stats", 500);
    }
  },
};
