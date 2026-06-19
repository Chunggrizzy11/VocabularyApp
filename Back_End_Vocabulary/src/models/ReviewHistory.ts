import mongoose, { Schema } from "mongoose";
import type { IReviewHistory } from "../interfaces/review.interface";

const reviewHistorySchema = new Schema<IReviewHistory>({
  deviceId: { type: String, default: "browser-device-001" },
  vocabularyId: { type: String, required: true },
  rating: {
    type: String,
    enum: ["again", "hard", "good", "easy"],
    required: true,
  },
  reviewedAt: { type: Date, default: Date.now },
});

reviewHistorySchema.index({ reviewedAt: -1 });

export const ReviewHistory = mongoose.model<IReviewHistory>("ReviewHistory", reviewHistorySchema);
