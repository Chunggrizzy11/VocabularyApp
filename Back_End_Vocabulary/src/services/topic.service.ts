import { topicRepository } from "../repositories/topic.repository";
import type { CreateTopicDTO, UpdateTopicDTO } from "../interfaces/topic.interface";

export const topicService = {
  getAll: () => topicRepository.findAll(),
  getById: (id: string) => topicRepository.findById(id),
  create: (data: CreateTopicDTO) => topicRepository.create(data),
  update: (id: string, data: UpdateTopicDTO) => topicRepository.update(id, data),
  delete: (id: string) => topicRepository.delete(id),
};
