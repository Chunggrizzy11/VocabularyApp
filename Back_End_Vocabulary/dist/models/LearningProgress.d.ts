import mongoose, { Document } from "mongoose";
export interface ILearningProgress extends Document {
    userId: string;
    deviceId: string;
    vocabularyId: string;
    repetition: number;
    interval: number;
    easeFactor: number;
    nextReviewDate: Date;
    status: string;
}
export declare const LearningProgress: mongoose.Model<ILearningProgress, {}, {}, {}, mongoose.Document<unknown, {}, ILearningProgress, {}, mongoose.DefaultSchemaOptions> & ILearningProgress & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILearningProgress>;
//# sourceMappingURL=LearningProgress.d.ts.map