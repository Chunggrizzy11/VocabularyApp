import mongoose, { Schema } from "mongoose";
import type { ITopic } from "../interfaces/topic.interface";

const topicSchema = new Schema<ITopic>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    totalWords: { type: Number, default: 0 },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export const Topic = mongoose.model<ITopic>("Topic", topicSchema);
