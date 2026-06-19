import type { IVocabulary, CreateVocabularyDTO, UpdateVocabularyDTO } from "../interfaces/vocabulary.interface";
export declare const vocabularyRepository: {
    findAll: (topicId?: string) => Promise<IVocabulary[]>;
    findById: (id: string) => Promise<IVocabulary | null>;
    search: (query: string) => Promise<IVocabulary[]>;
    create: (data: CreateVocabularyDTO) => Promise<IVocabulary>;
    update: (id: string, data: UpdateVocabularyDTO) => Promise<IVocabulary | null>;
    delete: (id: string) => Promise<IVocabulary | null>;
    findDueForReview: () => Promise<IVocabulary[]>;
    updateSRS: (id: string, srsLevel: number, nextReviewAt: Date) => Promise<IVocabulary | null>;
};
//# sourceMappingURL=vocabulary.repository.d.ts.map