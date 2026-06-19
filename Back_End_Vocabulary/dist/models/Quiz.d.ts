import mongoose from "mongoose";
import type { IQuizQuestion } from "../interfaces/quiz.interface";
export declare const Quiz: mongoose.Model<IQuizQuestion, {}, {}, {}, mongoose.Document<unknown, {}, IQuizQuestion, {}, mongoose.DefaultSchemaOptions> & IQuizQuestion & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IQuizQuestion>;
//# sourceMappingURL=Quiz.d.ts.map