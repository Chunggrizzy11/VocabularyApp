import { api } from "./api";

export const notebookService = {
  // ── Notebooks ──
  getAll: () => api.get<any[]>("/notebooks").then((r: any) => r.data),
  getById: (id: string) => api.get<any>(`/notebooks/${id}`).then((r: any) => r.data),
  create: (data: { name: string; description?: string }) =>
    api.post<any>("/notebooks", data).then((r: any) => r.data),
  update: (id: string, data: { name?: string; description?: string }) =>
    api.put<any>(`/notebooks/${id}`, data).then((r: any) => r.data),
  delete: (id: string) => api.delete<any>(`/notebooks/${id}`).then((r: any) => r.data),

  // ── Notebook Words ──
  getWords: (notebookId: string, search?: string) =>
    api.get<any[]>(`/notebooks/${notebookId}/words`, { params: search ? { search } : undefined }).then((r: any) => r.data),
  addWord: (notebookId: string, data: any) =>
    api.post<any>(`/notebooks/${notebookId}/words`, data).then((r: any) => r.data),
  removeWord: (wordId: string) => api.delete<any>(`/notebooks/words/${wordId}`).then((r: any) => r.data),

  // ── Notebook Review (SRS) ──
  getDueWords: (notebookId: string) =>
    api.get<any[]>(`/notebooks/${notebookId}/due`).then((r: any) => r.data),
  submitReview: (notebookId: string, wordId: string, rating: string) =>
    api.post<any>(`/notebooks/${notebookId}/review`, { wordId, rating }).then((r: any) => r.data),

  // ── Notebook Stats ──
  getStats: (notebookId: string) =>
    api.get<any>(`/notebooks/${notebookId}/stats`).then((r: any) => r.data),
};