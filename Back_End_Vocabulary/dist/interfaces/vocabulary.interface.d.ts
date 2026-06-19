import { Document, Types } from "mongoose";
export interface IVocabulary extends Document {
    topicId: Types.ObjectId;
    word: string;
    phonetic?: string;
    meaning: string;
    partOfSpeech: string;
    example: string;
    exampleTranslation: string;
    imageUrl?: string;
    audioUrl?: string;
    difficulty: string;
    srsLevel: number;
    nextReviewAt: Date | null;
    createdAt: Date;
}
export interface CreateVocabularyDTO {
    topicId: string;
    word: string;
    phonetic?: string;
    meaning: string;
    partOfSpeech: string;
    example: string;
    exampleTranslation: string;
    imageUrl?: string;
    audioUrl?: string;
    difficulty?: string;
}
export interface UpdateVocabularyDTO {
    word?: string;
    phonetic?: string;
    meaning?: string;
    partOfSpeech?: string;
    example?: string;
    exampleTranslation?: string;
    imageUrl?: string;
    audioUrl?: string;
    difficulty?: string;
}
//# sourceMappingURL=vocabulary.interface.d.ts.map