import { Topic } from "../models/Topic";
import type { ITopic, CreateTopicDTO, UpdateTopicDTO } from "../interfaces/topic.interface";

export const topicRepository = {
  findAll: async (): Promise<ITopic[]> => Topic.find().sort({ createdAt: -1 }),
  findById: async (id: string): Promise<ITopic | null> => Topic.findById(id),
  create: async (data: CreateTopicDTO): Promise<ITopic> => Topic.create(data),
  update: async (id: string, data: UpdateTopicDTO): Promise<ITopic | null> =>
    Topic.findByIdAndUpdate(id, data, { new: true }),
  delete: async (id: string): Promise<ITopic | null> => Topic.findByIdAndDelete(id),
  updateWordCount: async (id: string, delta: number): Promise<void> => {
    await Topic.findByIdAndUpdate(id, { $inc: { totalWords: delta } });
  },
};
