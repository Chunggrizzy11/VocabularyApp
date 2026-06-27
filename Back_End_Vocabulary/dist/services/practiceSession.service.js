"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.practiceSessionService = void 0;
const PracticeSession_1 = require("../models/PracticeSession");
exports.practiceSessionService = {
    async create(data) {
        const totalWords = data.words.length;
        const averageScore = totalWords > 0
            ? Math.round(data.words.reduce((sum, w) => sum + w.score, 0) / totalWords)
            : 0;
        const session = new PracticeSession_1.PracticeSession({
            userId: data.userId,
            topicId: data.topicId || null,
            topicName: data.topicName,
            words: data.words,
            averageScore,
            totalWords,
            startedAt: data.startedAt,
            completedAt: new Date(),
        });
        return session.save();
    },
    async getHistory(userId, limit = 20) {
        return PracticeSession_1.PracticeSession.find({ userId })
            .sort({ completedAt: -1 })
            .limit(limit)
            .lean();
    },
    async getStats(userId, topicId) {
        const match = { userId };
        if (topicId)
            match.topicId = topicId;
        const stats = await PracticeSession_1.PracticeSession.aggregate([
            { $match: match },
            {
                $group: {
                    _id: null,
                    totalSessions: { $sum: 1 },
                    totalWordsPracticed: { $sum: "$totalWords" },
                    averageScore: { $avg: "$averageScore" },
                },
            },
        ]);
        if (stats.length === 0) {
            return { totalSessions: 0, totalWordsPracticed: 0, averageScore: 0 };
        }
        return {
            totalSessions: stats[0].totalSessions,
            totalWordsPracticed: stats[0].totalWordsPracticed,
            averageScore: Math.round(stats[0].averageScore),
        };
    },
};
//# sourceMappingURL=practiceSession.service.js.map