import { Vocabulary } from "../models/Vocabulary";
import { ReviewHistory } from "../models/ReviewHistory";
import { StudySession } from "../models/StudySession";
import { QuizResult } from "../models/QuizResult";
import { studySessionService } from "./studySession.service";
import { quizResultService } from "./quizResult.service";

async function calculateStreaks(userId: string): Promise<{
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: Date | null;
}> {
  const rawDates = await ReviewHistory.distinct("reviewedAt", { userId });
  if (rawDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0, lastActiveDate: null };
  }

  // Normalize to YYYY-MM-DD strings
  const dateStrings = rawDates.map((d: Date) => {
    const date = new Date(d);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  });

  const uniqueDates = [...new Set(dateStrings)].sort().reverse();

  // Current streak: count consecutive days starting from the latest date
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const latestDate = uniqueDates[0];
  const latest = new Date(latestDate);
  const diffFromToday = Math.floor(
    (today.getTime() - latest.getTime()) / 86400000
  );

  let currentStreak = 0;
  if (diffFromToday <= 1) {
    // Today or yesterday — count streak
    currentStreak = 1;
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const current = new Date(uniqueDates[i]);
      const next = new Date(uniqueDates[i + 1]);
      const diff = Math.floor(
        (current.getTime() - next.getTime()) / 86400000
      );
      if (diff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Longest streak: scan all dates oldest-first
  const sortedAsc = [...uniqueDates].reverse();
  let longestStreak = 1;
  let tempStreak = 1;
  for (let i = 0; i < sortedAsc.length - 1; i++) {
    const current = new Date(sortedAsc[i]);
    const next = new Date(sortedAsc[i + 1]);
    const diff = Math.floor(
      (next.getTime() - current.getTime()) / 86400000
    );
    if (diff === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  return {
    currentStreak,
    longestStreak,
    lastActiveDate: new Date(uniqueDates[0]),
  };
}

export const statisticsService = {
  getUserStats: async (userId: string) => {
    const totalWordsLearned = await Vocabulary.countDocuments({
      srsLevel: { $gte: 1 },
    });
    const totalWordsMastered = await Vocabulary.countDocuments({
      srsLevel: { $gte: 4 },
    });
    const totalReviewSessions = await ReviewHistory.countDocuments({ userId });
    const totalTimeSpentMs = await studySessionService.getTotalTimeMs(userId);
    const { currentStreak, longestStreak, lastActiveDate } =
      await calculateStreaks(userId);
    const { totalQuizSessions, averageQuizScore } =
      await quizResultService.getStats(userId);

    return {
      totalWordsLearned,
      totalWordsMastered,
      totalReviewSessions,
      totalQuizSessions,
      averageQuizScore,
      currentStreak,
      longestStreak,
      totalTimeSpentMs,
      lastActiveDate: lastActiveDate ? lastActiveDate.toISOString() : null,
    };
  },
  getLearningProgress: async (userId: string, days: number = 30) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    return ReviewHistory.aggregate([
      { $match: { userId, reviewedAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$reviewedAt" } },
          wordsReviewed: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { date: "$_id", wordsReviewed: 1, _id: 0 } },
    ]);
  },
  getHeatmapData: async (userId: string, year?: number) => {
    const startYear = year || new Date().getFullYear();
    const start = new Date(startYear, 0, 1);
    const end = new Date(startYear, 11, 31);

    // Reviews (words reviewed)
    const reviewsRaw = await ReviewHistory.aggregate([
      { $match: { userId, reviewedAt: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$reviewedAt" } },
          count: { $sum: 1 },
        },
      },
    ]);

    // Study sessions (time spent learning)
    const studyRaw = await StudySession.aggregate([
      { $match: { userId, startedAt: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$startedAt" } },
          count: { $sum: 1 },
        },
      },
    ]);

    // Quiz results (quizzes completed)
    const quizRaw = await QuizResult.aggregate([
      { $match: { userId, completedAt: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } },
          count: { $sum: 1 },
        },
      },
    ]);

    // Merge all activities by date
    const merged: Record<string, number> = {};
    for (const r of reviewsRaw) merged[r._id] = (merged[r._id] || 0) + r.count;
    for (const s of studyRaw) merged[s._id] = (merged[s._id] || 0) + s.count;
    for (const q of quizRaw) merged[q._id] = (merged[q._id] || 0) + q.count;

    // Build full year with levels
    const days: { date: string; count: number; level: number }[] = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().slice(0, 10);
      const count = merged[dateStr] || 0;
      days.push({
        date: dateStr,
        count,
        level: Math.min(Math.floor(count / 3), 4),
      });
    }

    return days;
  },
};
