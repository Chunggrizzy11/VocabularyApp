import { vocabularyRepository } from "../repositories/vocabulary.repository";
import { topicRepository } from "../repositories/topic.repository";
import type { CreateVocabularyDTO, UpdateVocabularyDTO } from "../interfaces/vocabulary.interface";

export const vocabularyService = {
  getAll: (topicId?: string) => vocabularyRepository.findAll(topicId),
  getById: (id: string) => vocabularyRepository.findById(id),
  create: async (data: CreateVocabularyDTO) => {
    const word = await vocabularyRepository.create(data);
    await topicRepository.updateWordCount(data.topicId, 1);
    return word;
  },
  update: (id: string, data: UpdateVocabularyDTO) => vocabularyRepository.update(id, data),
  delete: async (id: string) => {
    const word = await vocabularyRepository.findById(id);
    if (word) {
      await vocabularyRepository.delete(id);
      await topicRepository.updateWordCount(word.topicId.toString(), -1);
    }
    return word;
  },
  search: (query: string) => vocabularyRepository.search(query),
  getDueForReview: () => vocabularyRepository.findDueForReview(),
};
