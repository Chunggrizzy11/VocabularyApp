import { PracticeSession } from "../models/PracticeSession";
import type { IPracticeSession, PracticeWord } from "../interfaces/practiceSession.interface";

export const practiceSessionService = {
  async create(data: {
    words: PracticeWord[];
    topicId?: string;
    topicName?: string;
    startedAt: Date;
    userId?: string;
  }): Promise<IPracticeSession> {
    const totalWords = data.words.length;
    const averageScore =
      totalWords > 0
        ? Math.round(data.words.reduce((sum, w) => sum + w.score, 0) / totalWords)
        : 0;

    const session = new PracticeSession({
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

  async getHistory(userId: string, limit: number = 20): Promise<IPracticeSession[]> {
    return PracticeSession.find({ userId })
      .sort({ completedAt: -1 })
      .limit(limit)
      .lean();
  },

  async getStats(userId: string, topicId?: string): Promise<{
    totalSessions: number;
    totalWordsPracticed: number;
    averageScore: number;
  }> {
    const match: any = { userId };
    if (topicId) match.topicId = topicId;

    const stats = await PracticeSession.aggregate([
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
