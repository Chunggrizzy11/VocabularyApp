import type { ITopic, CreateTopicDTO, UpdateTopicDTO } from "../interfaces/topic.interface";
export declare const topicRepository: {
    findAll: () => Promise<ITopic[]>;
    findById: (id: string) => Promise<ITopic | null>;
    create: (data: CreateTopicDTO) => Promise<ITopic>;
    update: (id: string, data: UpdateTopicDTO) => Promise<ITopic | null>;
    delete: (id: string) => Promise<ITopic | null>;
    updateWordCount: (id: string, delta: number) => Promise<void>;
};
//# sourceMappingURL=topic.repository.d.ts.map