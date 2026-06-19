"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vocabularyService = void 0;
const vocabulary_repository_1 = require("../repositories/vocabulary.repository");
const topic_repository_1 = require("../repositories/topic.repository");
exports.vocabularyService = {
    getAll: (topicId) => vocabulary_repository_1.vocabularyRepository.findAll(topicId),
    getById: (id) => vocabulary_repository_1.vocabularyRepository.findById(id),
    create: async (data) => {
        const word = await vocabulary_repository_1.vocabularyRepository.create(data);
        await topic_repository_1.topicRepository.updateWordCount(data.topicId, 1);
        return word;
    },
    update: (id, data) => vocabulary_repository_1.vocabularyRepository.update(id, data),
    delete: async (id) => {
        const word = await vocabulary_repository_1.vocabularyRepository.findById(id);
        if (word) {
            await vocabulary_repository_1.vocabularyRepository.delete(id);
            await topic_repository_1.topicRepository.updateWordCount(word.topicId.toString(), -1);
        }
        return word;
    },
    search: (query) => vocabulary_repository_1.vocabularyRepository.search(query),
    getDueForReview: () => vocabulary_repository_1.vocabularyRepository.findDueForReview(),
};
//# sourceMappingURL=vocabulary.service.js.map