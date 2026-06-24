import { api } from "./api";
import type { SpeakingSession } from "../types/Speaking";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const speakingService = {
  saveSession: (session: SpeakingSession) =>
    api.post<ApiResponse<unknown>>("/practice-sessions", session).then(r => r.data),
};
