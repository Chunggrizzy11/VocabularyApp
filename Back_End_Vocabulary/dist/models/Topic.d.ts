import mongoose from "mongoose";
import type { ITopic } from "../interfaces/topic.interface";
export declare const Topic: mongoose.Model<ITopic, {}, {}, {}, mongoose.Document<unknown, {}, ITopic, {}, mongoose.DefaultSchemaOptions> & ITopic & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITopic>;
//# sourceMappingURL=Topic.d.ts.map