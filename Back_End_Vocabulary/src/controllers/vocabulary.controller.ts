import { Request, Response } from "express";
import { vocabularyService } from "../services/vocabulary.service";
import { success, created, noContent, error } from "../utils/response";

export const vocabularyController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const topicId = req.query.topicId as string | undefined;
      const words = await vocabularyService.getAll(topicId);
      return success(res, words);
    } catch (e: any) { return error(res, e.message); }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const word = await vocabularyService.getById(req.params.id as string);
      if (!word) return error(res, "Word not found", 404);
      return success(res, word);
    } catch (e: any) { return error(res, e.message); }
  },
  search: async (req: Request, res: Response) => {
    try {
      const results = await vocabularyService.search(req.query.q as string);
      return success(res, results);
    } catch (e: any) { return error(res, e.message); }
  },
  create: async (req: Request, res: Response) => {
    try {
      const word = await vocabularyService.create(req.body);
      return created(res, word);
    } catch (e: any) { return error(res, e.message); }
  },
  update: async (req: Request, res: Response) => {
    try {
      const word = await vocabularyService.update(req.params.id as string, req.body);
      if (!word) return error(res, "Word not found", 404);
      return success(res, word);
    } catch (e: any) { return error(res, e.message); }
  },
  delete: async (req: Request, res: Response) => {
    try {
      await vocabularyService.delete(req.params.id as string);
      return noContent(res);
    } catch (e: any) { return error(res, e.message); }
  },
  getDueForReview: async (_req: Request, res: Response) => {
    try {
      const items = await vocabularyService.getDueForReview();
      return success(res, items);
    } catch (e: any) { return error(res, e.message); }
  },
};
