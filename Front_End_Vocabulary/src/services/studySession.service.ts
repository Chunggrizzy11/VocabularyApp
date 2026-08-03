import { api } from "./api";

export const studySessionService = {
  logSession: (data: {
    activityType: string;
    startedAt: string;
    endedAt?: string;
    topicId?: string;
  }) => api.post("/study-sessions", data).then((r: any) => r.data),
};
