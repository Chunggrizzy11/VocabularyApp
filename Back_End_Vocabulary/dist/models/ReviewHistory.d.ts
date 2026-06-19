import mongoose from "mongoose";
import type { IReviewHistory } from "../interfaces/review.interface";
export declare const ReviewHistory: mongoose.Model<IReviewHistory, {}, {}, {}, mongoose.Document<unknown, {}, IReviewHistory, {}, mongoose.DefaultSchemaOptions> & IReviewHistory & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IReviewHistory>;
//# sourceMappingURL=ReviewHistory.d.ts.map