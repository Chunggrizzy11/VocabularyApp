import mongoose, { Schema } from "mongoose";
import type { IVocabulary } from "../interfaces/vocabulary.interface";

const vocabularySchema = new Schema<IVocabulary>(
  {
    topicId: { type: Schema.Types.ObjectId, ref: "Topic", required: true, index: true },
    word: { type: String, required: true, trim: true },
    phonetic: { type: String, default: "" },
    meaning: { type: String, required: true },
    partOfSpeech: { type: String, required: true },
    example: { type: String, default: "" },
    exampleTranslation: { type: String, default: "" },
    imageUrl: { type: String },
    audioUrl: { type: String },
    difficulty: { type: String, default: "A2" },
    srsLevel: { type: Number, default: 0 },
    nextReviewAt: { type: Date, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

vocabularySchema.index({ nextReviewAt: 1 });
vocabularySchema.index({ word: "text", meaning: "text" });

export const Vocabulary = mongoose.model<IVocabulary>("Vocabulary", vocabularySchema);
