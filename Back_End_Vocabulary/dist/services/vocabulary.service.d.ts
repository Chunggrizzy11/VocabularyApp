import type { CreateVocabularyDTO, UpdateVocabularyDTO } from "../interfaces/vocabulary.interface";
export declare const vocabularyService: {
    getAll: (topicId?: string) => Promise<import("../interfaces/vocabulary.interface").IVocabulary[]>;
    getById: (id: string) => Promise<import("../interfaces/vocabulary.interface").IVocabulary | null>;
    create: (data: CreateVocabularyDTO) => Promise<import("../interfaces/vocabulary.interface").IVocabulary>;
    update: (id: string, data: UpdateVocabularyDTO) => Promise<import("../interfaces/vocabulary.interface").IVocabulary | null>;
    delete: (id: string) => Promise<import("../interfaces/vocabulary.interface").IVocabulary | null>;
    search: (query: string) => Promise<import("../interfaces/vocabulary.interface").IVocabulary[]>;
    getDueForReview: () => Promise<import("../interfaces/vocabulary.interface").IVocabulary[]>;
};
//# sourceMappingURL=vocabulary.service.d.ts.map