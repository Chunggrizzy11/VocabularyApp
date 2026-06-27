import { Request, Response } from "express";
import { topicService } from "../services/topic.service";
import { success, created, noContent, error } from "../utils/response";

export const topicController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const topics = await topicService.getAll();
      success(res, topics);
    } catch (e: any) {
      error(res, e.message);
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const topic = await topicService.getById(req.params.id as string);
      if (!topic) error(res, "Topic not found", 404);
      success(res, topic);
    } catch (e: any) {
      error(res, e.message);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const topic = await topicService.create(req.body);
      created(res, topic);
    } catch (e: any) {
      error(res, e.message);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const topic = await topicService.update(req.params.id as string, req.body);
      if (!topic) error(res, "Topic not found", 404);
      success(res, topic);
    } catch (e: any) {
      error(res, e.message);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      await topicService.delete(req.params.id as string);
      noContent(res);
    } catch (e: any) {
      error(res, e.message);
    }
  },
};
