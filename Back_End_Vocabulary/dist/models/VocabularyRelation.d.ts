import mongoose, { Document } from "mongoose";
export interface IVocabularyRelation extends Document {
    sourceWordId: string;
    targetWordId: string;
    relationType: "synonym" | "antonym" | "related";
}
export declare const VocabularyRelation: mongoose.Model<IVocabularyRelation, {}, {}, {}, mongoose.Document<unknown, {}, IVocabularyRelation, {}, mongoose.DefaultSchemaOptions> & IVocabularyRelation & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IVocabularyRelation>;
//# sourceMappingURL=VocabularyRelation.d.ts.map