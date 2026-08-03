import { notebookRepository } from "../repositories/notebook.repository";
import { calculateNextReview } from "../utils/srsCalculator";
import type { SRSRating } from "../interfaces/review.interface";
import type { CreateNotebookDTO, UpdateNotebookDTO, CreateNotebookWordDTO } from "../interfaces/notebook.interface";

export const notebookService = {
  // ── Notebooks ──
  getAll: async (userId: string) => notebookRepository.findMany(userId),
  getById: async (id: string, userId: string) => notebookRepository.findById(id, userId),
  create: async (userId: string, data: CreateNotebookDTO) => notebookRepository.create(userId, data),
  update: async (id: string, userId: string, data: UpdateNotebookDTO) => notebookRepository.update(id, userId, data),
  delete: async (id: string, userId: string) => notebookRepository.delete(id, userId),

  // ── NotebookWords ──
  getWords: async (notebookId: string, userId: string, search?: string) =>
    notebookRepository.findWords(notebookId, userId, search),
  addWord: async (notebookId: string, userId: string, data: CreateNotebookWordDTO) => {
    // Note: In real app, might want to check if word already exists in this notebook
    const wordData = { ...data, notebookId, userId };
    // @ts-ignore
    const word = await notebookRepository.createWord(userId, wordData);
    await notebookRepository.touch(notebookId); // cập nhật updatedAt
    return word;
  },
  removeWord: async (wordId: string, userId: string) => {
    const word = await notebookRepository.deleteWord(wordId, userId);
    // Cần tìm notebookId của word để touch (hoặc pass notebookId vào hàm)
    // Hiện tại repository.deleteWord không trả về notebookId
    // Tạm comment để tránh lỗi, sẽ cần cập nhật repo
    // await notebookRepository.touch(notebookId);
    return word;
  },
  getDueWords: async (notebookId: string, userId: string) => notebookRepository.findDueWords(notebookId, userId),

  submitResult: async (wordId: string, rating: SRSRating, userId: string) => {
    const word = await notebookRepository.findWordById(wordId, userId);
    if (!word) throw new Error("Word not found in notebook");

    const { level, nextReviewAt } = calculateNextReview(word.srsLevel, rating);

    // Update logic for notebook words (using srsCalculator which returns level 0-4)
    // Need to map level to interval/easeFactor if using SM-2
    // For now stick to simple update
    await notebookRepository.updateSRS(
        wordId,
        userId,
        level,
        nextReviewAt,
        word.interval, // placeholder for now
        word.easeFactor, // placeholder for now
        word.reviewCount + 1
    );
  },

  getStats: async (notebookId: string, userId: string) => notebookRepository.getStats(notebookId, userId),
};
