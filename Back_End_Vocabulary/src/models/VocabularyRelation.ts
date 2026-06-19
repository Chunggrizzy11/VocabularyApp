import mongoose, { Schema, Document } from "mongoose";

export interface IVocabularyRelation extends Document {
  sourceWordId: string;
  targetWordId: string;
  relationType: "synonym" | "antonym" | "related";
}

const vocabularyRelationSchema = new Schema<IVocabularyRelation>({
  sourceWordId: { type: String, required: true },
  targetWordId: { type: String, required: true },
  relationType: { type: String, enum: ["synonym", "antonym", "related"], required: true },
});

export const VocabularyRelation = mongoose.model<IVocabularyRelation>("VocabularyRelation", vocabularyRelationSchema);
