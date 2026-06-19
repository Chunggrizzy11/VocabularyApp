import { Vocabulary } from "../models/Vocabulary";
import type { IVocabulary, CreateVocabularyDTO, UpdateVocabularyDTO } from "../interfaces/vocabulary.interface";

export const vocabularyRepository = {
  findAll: async (topicId?: string): Promise<IVocabulary[]> => {
    const filter = topicId ? { topicId } : {};
    return Vocabulary.find(filter).sort({ createdAt: -1 });
  },
  findById: async (id: string): Promise<IVocabulary | null> => Vocabulary.findById(id),
  search: async (query: string): Promise<IVocabulary[]> =>
    Vocabulary.find({
      $or: [
        { word: { $regex: query, $options: "i" } },
        { meaning: { $regex: query, $options: "i" } },
      ],
    }),
  create: async (data: CreateVocabularyDTO): Promise<IVocabulary> => Vocabulary.create(data),
  update: async (id: string, data: UpdateVocabularyDTO): Promise<IVocabulary | null> =>
    Vocabulary.findByIdAndUpdate(id, data, { new: true }),
  delete: async (id: string): Promise<IVocabulary | null> => Vocabulary.findByIdAndDelete(id),
  findDueForReview: async (): Promise<IVocabulary[]> =>
    Vocabulary.find({
      $or: [{ nextReviewAt: null }, { nextReviewAt: { $lte: new Date() } }],
    }).sort({ nextReviewAt: 1 }),
  updateSRS: async (id: string, srsLevel: number, nextReviewAt: Date): Promise<IVocabulary | null> =>
    Vocabulary.findByIdAndUpdate(id, { srsLevel, nextReviewAt }, { new: true }),
};
