"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRepository = void 0;
const ReviewHistory_1 = require("../models/ReviewHistory");
exports.reviewRepository = {
    create: async (vocabularyId, rating) => ReviewHistory_1.ReviewHistory.create({ vocabularyId, rating }),
    findByVocabularyId: async (vocabularyId) => ReviewHistory_1.ReviewHistory.find({ vocabularyId }).sort({ reviewedAt: -1 }),
    countByDateRange: async (startDate, endDate) => ReviewHistory_1.ReviewHistory.countDocuments({ reviewedAt: { $gte: startDate, $lte: endDate } }),
    getRecentReviews: async (limit = 50) => ReviewHistory_1.ReviewHistory.find().sort({ reviewedAt: -1 }).limit(limit),
};
//# sourceMappingURL=review.repository.js.map