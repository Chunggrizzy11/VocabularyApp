import mongoose from "mongoose";
import type { IVocabulary } from "../interfaces/vocabulary.interface";
export declare const Vocabulary: mongoose.Model<IVocabulary, {}, {}, {}, mongoose.Document<unknown, {}, IVocabulary, {}, mongoose.DefaultSchemaOptions> & IVocabulary & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IVocabulary>;
//# sourceMappingURL=Vocabulary.d.ts.map