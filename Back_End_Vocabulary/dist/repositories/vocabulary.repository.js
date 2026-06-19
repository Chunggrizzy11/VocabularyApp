"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vocabularyRepository = void 0;
const Vocabulary_1 = require("../models/Vocabulary");
exports.vocabularyRepository = {
    findAll: async (topicId) => {
        const filter = topicId ? { topicId } : {};
        return Vocabulary_1.Vocabulary.find(filter).sort({ createdAt: -1 });
    },
    findById: async (id) => Vocabulary_1.Vocabulary.findById(id),
    search: async (query) => Vocabulary_1.Vocabulary.find({
        $or: [
            { word: { $regex: query, $options: "i" } },
            { meaning: { $regex: query, $options: "i" } },
        ],
    }),
    create: async (data) => Vocabulary_1.Vocabulary.create(data),
    update: async (id, data) => Vocabulary_1.Vocabulary.findByIdAndUpdate(id, data, { new: true }),
    delete: async (id) => Vocabulary_1.Vocabulary.findByIdAndDelete(id),
    findDueForReview: async () => Vocabulary_1.Vocabulary.find({
        $or: [{ nextReviewAt: null }, { nextReviewAt: { $lte: new Date() } }],
    }).sort({ nextReviewAt: 1 }),
    updateSRS: async (id, srsLevel, nextReviewAt) => Vocabulary_1.Vocabulary.findByIdAndUpdate(id, { srsLevel, nextReviewAt }, { new: true }),
};
//# sourceMappingURL=vocabulary.repository.js.map