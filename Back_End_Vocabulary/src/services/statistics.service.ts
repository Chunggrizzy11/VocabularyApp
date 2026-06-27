import { Vocabulary } from "../models/Vocabulary";
import { ReviewHistory } from "../models/ReviewHistory";

export const statisticsService = {
  getUserStats: async (userId: string) => {
    const totalWordsLearned = await Vocabulary.countDocuments({ srsLevel: { $gte: 1 } });
    const totalWordsMastered = await Vocabulary.countDocuments({ srsLevel: { $gte: 4 } });
    const totalReviewSessions = await ReviewHistory.countDocuments({ userId });

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
  getLearningProgress: async (userId: string, days: number = 30) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    return ReviewHistory.aggregate([
      { $match: { userId, reviewedAt: { $gte: startDate } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$reviewedAt" } }, wordsReviewed: { $sum: 1 } } },
      { $sort: { _id: 1 } },
      { $project: { date: "$_id", wordsReviewed: 1, _id: 0 } },
    ]);
  },
  getHeatmapData: async (userId: string, year?: number) => {
    const startYear = year || new Date().getFullYear();
    const start = new Date(startYear, 0, 1);
    const end = new Date(startYear, 11, 31);
    const records = await ReviewHistory.aggregate([
      { $match: { userId, reviewedAt: { $gte: start, $lte: end } } },
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
