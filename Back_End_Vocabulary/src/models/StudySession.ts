import mongoose, { Schema } from "mongoose";
import type { IStudySession, ActivityType } from "../interfaces/studySession.interface";

const studySessionSchema = new Schema<IStudySession>(
  {
    userId: { type: String, required: true, index: true },
    activityType: {
      type: String,
      enum: ["review", "flashcard", "quiz", "speaking"] satisfies ActivityType[],
      required: true,
    },
    startedAt: { type: Date, required: true },
    endedAt: { type: Date, required: true },
    durationMs: { type: Number, required: true, min: 0 },
    topicId: { type: Schema.Types.ObjectId, ref: "Topic", default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

studySessionSchema.index({ userId: 1, startedAt: -1 });

export const StudySession = mongoose.model<IStudySession>("StudySession", studySessionSchema);
