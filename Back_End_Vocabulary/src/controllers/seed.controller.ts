import { Request, Response } from "express";
import { seedService } from "../services/seed.service";
import { success, created, error } from "../utils/response";
import { Topic } from "../models/Topic";
import { Vocabulary } from "../models/Vocabulary";

export const seedController = {
  /** GET /api/seed/definitions — list all seedable topics */
  getDefinitions: (_req: Request, res: Response) => {
    const defs = seedService.getDefinitions().map((d) => ({
      title: d.title,
      description: d.description,
      targetWordCount: d.targetWordCount || 25,
      levels: d.levels,
    }));
    return success(res, defs);
  },

  /** POST /api/seed/topic — seed a single topic */
  seedTopic: async (req: Request, res: Response) => {
    try {
      const { title } = req.body;
      if (!title) return error(res, "Missing required field: title", 400);

      const defs = seedService.getDefinitions();
      const def = defs.find((d) => d.title === title);
      if (!def) {
        return error(res, `Unknown topic: "${title}". Use GET /api/seed/definitions to see available topics.`, 404);
      }

      const result = await seedService.seedTopic(def);
      return created(res, result);
    } catch (e: any) {
      return error(res, e.message);
    }
  },

  /** POST /api/seed/all — seed all predefined topics */
  seedAll: async (_req: Request, res: Response) => {
    try {
      const results = await seedService.seedAll();
      const total = results.reduce((s, r) => s + r.wordsCreated, 0);
      return created(res, {
        topics: results.length,
        totalWordsCreated: total,
        details: results,
      });
    } catch (e: any) {
      return error(res, e.message);
    }
  },

  /** POST /api/seed/reseed — drop all vocabulary & topics, then re-seed from word bank */
  reseed: async (_req: Request, res: Response) => {
    try {
      await Vocabulary.deleteMany({});
      await Topic.deleteMany({});
      const results = await seedService.seedAll();
      const total = results.reduce((s, r) => s + r.wordsCreated, 0);
      return created(res, {
        topics: results.length,
        totalWordsCreated: total,
        details: results,
      });
    } catch (e: any) {
      return error(res, e.message);
    }
  },

  /** POST /api/seed/topic/:id — seed more words into an existing topic via API */
  seedIntoTopic: async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const { keyword, count = 20 } = req.body;
      if (!keyword) return error(res, "Missing field: keyword", 400);

      const created = await seedService.seedIntoTopic(id, keyword, count);
      return success(res, { created });
    } catch (e: any) {
      return error(res, e.message);
    }
  },
};
