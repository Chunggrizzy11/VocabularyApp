import { QuizResult } from "../models/QuizResult";

export const quizResultService = {
  async save(data: {
    userId: string;
    score: number;
    totalQuestions: number;
    topicId?: string;
  }) {
    const result = new QuizResult({
      userId: data.userId,
      score: data.score,
      totalQuestions: data.totalQuestions,
      topicId: data.topicId || null,
      completedAt: new Date(),
    });
    return result.save();
  },

  async getStats(userId: string) {
    const stats = await QuizResult.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          totalScore: { $sum: "$score" },
          totalQuestions: { $sum: "$totalQuestions" },
        },
      },
    ]);

    if (stats.length === 0) {
      return { totalQuizSessions: 0, averageQuizScore: 0 };
    }

    const { totalSessions, totalScore, totalQuestions } = stats[0];
    return {
      totalQuizSessions: totalSessions,
      averageQuizScore:
        totalQuestions > 0
          ? Math.round((totalScore / totalQuestions) * 100)
          : 0,
    };
  },
};
