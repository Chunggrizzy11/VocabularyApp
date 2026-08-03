import { Request, Response } from "express";
import { notebookService } from "../services/notebook.service";
import { success, error } from "../utils/response";

export const notebookController = {
  // ── Notebooks ──
  getAll: async (req: Request, res: Response) => {
    try {
      const notebooks = await notebookService.getAll(req.userId!);
      success(res, notebooks);
    } catch (e: any) { error(res, e.message); }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const notebook = await notebookService.getById(req.params.id as string, req.userId!);
      if (!notebook) return error(res, "Notebook not found", 404);
      success(res, notebook);
    } catch (e: any) { error(res, e.message); }
  },
  create: async (req: Request, res: Response) => {
    try {
      const notebook = await notebookService.create(req.userId!, req.body);
      success(res, notebook, 201);
    } catch (e: any) { error(res, e.message); }
  },
  update: async (req: Request, res: Response) => {
    try {
      const notebook = await notebookService.update(req.params.id as string, req.userId!, req.body);
      if (!notebook) return error(res, "Notebook not found", 404);
      success(res, notebook);
    } catch (e: any) { error(res, e.message); }
  },
  delete: async (req: Request, res: Response) => {
    try {
      await notebookService.delete(req.params.id as string, req.userId!);
      success(res, { message: "Notebook deleted" });
    } catch (e: any) { error(res, e.message); }
  },

  // ── NotebookWords ──
  getWords: async (req: Request, res: Response) => {
    try {
      const search = req.query.search as string;
      const words = await notebookService.getWords(req.params.id as string, req.userId!, search);
      success(res, words);
    } catch (e: any) { error(res, e.message); }
  },
  addWord: async (req: Request, res: Response) => {
    try {
      const word = await notebookService.addWord(req.params.id as string, req.userId!, req.body);
      success(res, word, 201);
    } catch (e: any) { error(res, e.message); }
  },
  removeWord: async (req: Request, res: Response) => {
    try {
      await notebookService.removeWord(req.params.wordId as string, req.userId!);
      success(res, { message: "Word removed from notebook" });
    } catch (e: any) { error(res, e.message); }
  },
  getDueWords: async (req: Request, res: Response) => {
    try {
      const words = await notebookService.getDueWords(req.params.id as string, req.userId!);
      success(res, words);
    } catch (e: any) { error(res, e.message); }
  },
  submitReview: async (req: Request, res: Response) => {
    try {
      const { wordId, rating } = req.body;
      await notebookService.submitResult(wordId as string, rating, req.userId!);
      success(res, { message: "Review recorded" });
    } catch (e: any) { error(res, e.message); }
  },
  getStats: async (req: Request, res: Response) => {
    try {
      const stats = await notebookService.getStats(req.params.id as string, req.userId!);
      success(res, stats);
    } catch (e: any) { error(res, e.message); }
  },
};
