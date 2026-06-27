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
  update: (id: string, topic: { title?: string; description?: string; imageUrl?: string }) =>
    api.put<ApiResponse<Topic>>(`/topics/${id}`, topic).then(r => r.data),
  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/topics/${id}`).then(r => r.data),
};
