import mongoose from "mongoose";
import type { IPracticeSession } from "../interfaces/practiceSession.interface";
export declare const PracticeSession: mongoose.Model<IPracticeSession, {}, {}, {}, mongoose.Document<unknown, {}, IPracticeSession, {}, mongoose.DefaultSchemaOptions> & IPracticeSession & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IPracticeSession>;
//# sourceMappingURL=PracticeSession.d.ts.map