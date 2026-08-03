import mongoose from "mongoose";
import { Notebook, INotebook } from "../models/Notebook";
import { NotebookWord, INotebookWord } from "../models/NotebookWord";
import type { CreateNotebookDTO, UpdateNotebookDTO, CreateNotebookWordDTO } from "../interfaces/notebook.interface";

export const notebookRepository = {
  // ── Notebooks ──
  findMany: async (userId: string): Promise<INotebook[]> =>
    Notebook.find({ userId }).sort({ createdAt: -1 }),
  findById: async (id: string, userId: string): Promise<INotebook | null> =>
    Notebook.findOne({ _id: id, userId }),
  create: async (userId: string, data: CreateNotebookDTO): Promise<INotebook> =>
    Notebook.create({ ...data, userId }),
  update: async (id: string, userId: string, data: UpdateNotebookDTO): Promise<INotebook | null> =>
    Notebook.findOneAndUpdate({ _id: id, userId }, data, { new: true }),
  delete: async (id: string, userId: string): Promise<INotebook | null> => {
    const deleted = await Notebook.findOneAndDelete({ _id: id, userId });
    await NotebookWord.deleteMany({ notebookId: id });
    return deleted;
  },

  // ── NotebookWords ──
  findWords: async (
    notebookId: string,
    userId: string,
    search?: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<INotebookWord[]> => {
    const filter: Record<string, unknown> = { notebookId, userId };
    if (search) {
      filter.$or = [
        { word: { $regex: search, $options: "i" } },
        { meaning: { $regex: search, $options: "i" } },
      ];
    }
    return NotebookWord.find(filter)
      .sort({ addedAt: -1 })
      .skip(offset)
      .limit(limit);
  },
  countWords: async (notebookId: string, userId: string): Promise<number> =>
    NotebookWord.countDocuments({ notebookId, userId }),
  findWordById: async (id: string, userId: string): Promise<INotebookWord | null> =>
    NotebookWord.findOne({ _id: id, userId }),
  createWord: async (userId: string, data: CreateNotebookWordDTO): Promise<INotebookWord> =>
    NotebookWord.create({ ...data, userId }),
  deleteWord: async (id: string, userId: string): Promise<INotebookWord | null> =>
    NotebookWord.findOneAndDelete({ _id: id, userId }),
  deleteAllWords: async (notebookId: string): Promise<void> => {
    await NotebookWord.deleteMany({ notebookId });
  },
  findDueWords: async (notebookId: string, userId: string): Promise<INotebookWord[]> =>
    NotebookWord.find({
      notebookId,
      userId,
      $or: [{ nextReviewAt: null }, { nextReviewAt: { $lte: new Date() } }],
    }).sort({ nextReviewAt: 1 }),
  updateSRS: async (
    id: string,
    userId: string,
    srsLevel: number,
    nextReviewAt: Date,
    interval: number,
    easeFactor: number,
    reviewCount: number
  ): Promise<INotebookWord | null> =>
    NotebookWord.findOneAndUpdate(
      { _id: id, userId },
      { srsLevel, nextReviewAt, interval, easeFactor, reviewCount },
      { new: true }
    ),
  // ── Aggregations ──
  getStats: async (notebookId: string, userId: string) => {
    const total = await NotebookWord.countDocuments({ notebookId, userId });
    const mastered = await NotebookWord.countDocuments({
      notebookId, userId, srsLevel: { $gte: 4 },
    });
    const due = await NotebookWord.countDocuments({
      notebookId, userId,
      $or: [{ nextReviewAt: null }, { nextReviewAt: { $lte: new Date() } }],
    });
    const learning = await NotebookWord.countDocuments({
      notebookId, userId, srsLevel: { $gte: 1, $lt: 4 },
    });
    return { total, mastered, due, learning };
  },
};