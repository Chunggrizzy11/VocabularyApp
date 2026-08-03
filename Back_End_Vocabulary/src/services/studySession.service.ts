import { StudySession } from "../models/StudySession";

export const studySessionService = {
  /** Log a study session — only persists if duration > 10 seconds */
  async logSession(data: {
    userId: string;
    activityType: string;
    startedAt: string;
    endedAt?: string;
    topicId?: string;
  }) {
    const startedAt = new Date(data.startedAt);
    const endedAt = data.endedAt ? new Date(data.endedAt) : new Date();
    const durationMs = Math.max(0, endedAt.getTime() - startedAt.getTime());

    // Ignore sessions shorter than 10 seconds
    if (durationMs < 10_000) return null;

    const session = new StudySession({
      userId: data.userId,
      activityType: data.activityType,
      startedAt,
      endedAt,
      durationMs,
      topicId: data.topicId || null,
    });
    return session.save();
  },

  /** Get total study time in milliseconds for a user */
  async getTotalTimeMs(userId: string): Promise<number> {
    const result = await StudySession.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$durationMs" } } },
    ]);
    return result.length > 0 ? result[0].total : 0;
  },

  /** Get daily time breakdown for the last N days */
  async getDailyBreakdown(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    return StudySession.aggregate([
      { $match: { userId, startedAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$startedAt" } },
          totalMs: { $sum: "$durationMs" },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { date: "$_id", totalMs: 1, _id: 0 } },
    ]);
  },
};
