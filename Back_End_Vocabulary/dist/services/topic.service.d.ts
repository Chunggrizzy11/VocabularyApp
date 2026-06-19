import type { CreateTopicDTO, UpdateTopicDTO } from "../interfaces/topic.interface";
export declare const topicService: {
    getAll: () => Promise<import("../interfaces/topic.interface").ITopic[]>;
    getById: (id: string) => Promise<import("../interfaces/topic.interface").ITopic | null>;
    create: (data: CreateTopicDTO) => Promise<import("../interfaces/topic.interface").ITopic>;
    update: (id: string, data: UpdateTopicDTO) => Promise<import("../interfaces/topic.interface").ITopic | null>;
    delete: (id: string) => Promise<import("../interfaces/topic.interface").ITopic | null>;
};
//# sourceMappingURL=topic.service.d.ts.map