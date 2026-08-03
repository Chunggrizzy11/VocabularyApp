import { Document, Types } from "mongoose";

export interface IQuizResult extends Document {
  userId: string;
  score: number;
  totalQuestions: number;
  topicId?: Types.ObjectId | null;
  completedAt: Date;
}
