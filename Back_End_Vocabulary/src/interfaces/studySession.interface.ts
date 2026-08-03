import { Document, Types } from "mongoose";

export type ActivityType = "review" | "flashcard" | "quiz" | "speaking";

export interface IStudySession extends Document {
  userId: string;
  activityType: ActivityType;
  startedAt: Date;
  endedAt: Date;
  durationMs: number;
  topicId?: Types.ObjectId | null;
}

export interface IStudySessionStats {
  totalTimeMs: number;
  dailyBreakdown: { date: string; totalMs: number }[];
}
