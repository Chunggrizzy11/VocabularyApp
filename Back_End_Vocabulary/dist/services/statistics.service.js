"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statisticsService = void 0;
const Vocabulary_1 = require("../models/Vocabulary");
const ReviewHistory_1 = require("../models/ReviewHistory");
exports.statisticsService = {
    getUserStats: async () => {
        const totalWordsLearned = await Vocabulary_1.Vocabulary.countDocuments({ srsLevel: { $gte: 1 } });
        const totalWordsMastered = await Vocabulary_1.Vocabulary.countDocuments({ srsLevel: { $gte: 4 } });
        const totalReviewSessions = await ReviewHistory_1.ReviewHistory.countDocuments();
        return {
            totalWordsLearned,
            totalWordsMastered,
            totalReviewSessions,
            totalQuizSessions: 0,
            averageQuizScore: 0,
            currentStreak: 0,
            longestStreak: 0,
            totalTimeSpentMs: 0,
            lastActiveDate: null,
        };
    },
    getLearningProgress: async (days = 30) => {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        return ReviewHistory_1.ReviewHistory.aggregate([
            { $match: { reviewedAt: { $gte: startDate } } },
            { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$reviewedAt" } }, wordsReviewed: { $sum: 1 } } },
            { $sort: { _id: 1 } },
            { $project: { date: "$_id", wordsReviewed: 1, _id: 0 } },
        ]);
    },
    getHeatmapData: async (year) => {
        const startYear = year || new Date().getFullYear();
        const start = new Date(startYear, 0, 1);
        const end = new Date(startYear, 11, 31);
        const records = await ReviewHistory_1.ReviewHistory.aggregate([
            { $match: { reviewedAt: { $gte: start, $lte: end } } },
            { $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$reviewedAt" } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        return records.map((r) => ({
            date: r._id,
            count: r.count,
            level: Math.min(Math.floor(r.count / 5), 4),
        }));
    },
};
//# sourceMappingURL=statistics.service.js.map