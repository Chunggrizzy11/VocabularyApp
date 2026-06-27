import { Document } from "mongoose";
export type SRSRating = "again" | "hard" | "good" | "easy";
export interface IReviewHistory extends Document {
    userId: string;
    deviceId: string;
    vocabularyId: string;
    rating: SRSRating;
    reviewedAt: Date;
}
export interface ReviewSessionDTO {
    vocabularyId: string;
    rating: SRSRating;
}
//# sourceMappingURL=review.interface.d.ts.map