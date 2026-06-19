import { api } from "./api";
import type { Topic } from "../types/Topic";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const topicService = {
  getAll: () => api.get<ApiResponse<Topic[]>>("/topics").then(r => r.data),
  getById: (id: string) => api.get<ApiResponse<Topic>>(`/topics/${id}`).then(r => r.data),
  create: (topic: { title: string; description: string; imageUrl?: string }) =>
    api.post<ApiResponse<Topic>>("/topics", topic).then(r => r.data),
};
