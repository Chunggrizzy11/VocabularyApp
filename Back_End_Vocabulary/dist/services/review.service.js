"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const vocabulary_repository_1 = require("../repositories/vocabulary.repository");
const review_repository_1 = require("../repositories/review.repository");
const srsCalculator_1 = require("../utils/srsCalculator");
exports.reviewService = {
    getDueItems: async () => {
        const words = await vocabulary_repository_1.vocabularyRepository.findDueForReview();
        return words.map((w) => ({
            vocabularyId: w._id.toString(),
            word: w.word,
            phonetic: w.phonetic,
            meaning: w.meaning,
            example: w.example,
            partOfSpeech: w.partOfSpeech,
            srsLevel: w.srsLevel,
            nextReviewAt: w.nextReviewAt?.toISOString() ?? null,
        }));
    },
    submitResult: async (vocabularyId, rating) => {
        const word = await vocabulary_repository_1.vocabularyRepository.findById(vocabularyId);
        if (!word)
            throw new Error("Vocabulary not found");
        const { level, nextReviewAt } = (0, srsCalculator_1.calculateNextReview)(word.srsLevel, rating);
        await vocabulary_repository_1.vocabularyRepository.updateSRS(vocabularyId, level, nextReviewAt);
        await review_repository_1.reviewRepository.create(vocabularyId, rating);
    },
};
//# sourceMappingURL=review.service.js.map