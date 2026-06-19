import { Document } from "mongoose";
export interface ITopic extends Document {
    title: string;
    description: string;
    totalWords: number;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateTopicDTO {
    title: string;
    description: string;
    imageUrl?: string;
}
export interface UpdateTopicDTO {
    title?: string;
    description?: string;
    imageUrl?: string;
}
//# sourceMappingURL=topic.interface.d.ts.map