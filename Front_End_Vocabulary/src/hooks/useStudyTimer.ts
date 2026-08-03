import { useEffect, useRef } from "react";
import { studySessionService } from "../services/studySession.service";

export function useStudyTimer(
  activityType: "review" | "flashcard" | "quiz" | "speaking",
  topicId?: string
) {
  const startTimeRef = useRef<number>(Date.now());
  const activityRef = useRef(activityType);
  const topicIdRef = useRef(topicId);
  const loggedRef = useRef(false);

  // Keep refs in sync
  activityRef.current = activityType;
  topicIdRef.current = topicId;

  const logSession = (endedAt: Date) => {
    if (loggedRef.current) return; // prevent double-log
    const duration = endedAt.getTime() - startTimeRef.current;
    if (duration < 10_000) return; // ignore sessions shorter than 10s

    loggedRef.current = true;
    studySessionService
      .logSession({
        activityType: activityRef.current,
        startedAt: new Date(startTimeRef.current).toISOString(),
        endedAt: endedAt.toISOString(),
        topicId: topicIdRef.current,
      })
      .catch(() => {
        // silent fail — tracking is best-effort
      });
  };

  useEffect(() => {
    startTimeRef.current = Date.now();
    loggedRef.current = false;

    const handleBeforeUnload = () => {
      const endedAt = new Date();
      const duration = endedAt.getTime() - startTimeRef.current;
      if (duration < 10_000) return;

      const payload = {
        activityType: activityRef.current,
        startedAt: new Date(startTimeRef.current).toISOString(),
        endedAt: endedAt.toISOString(),
        topicId: topicIdRef.current,
      };
      // Use sendBeacon for reliability on tab close
      const blob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });
      navigator.sendBeacon(
        `${import.meta.env.VITE_API_BASE_URL || "/api"}/study-sessions`,
        blob
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      logSession(new Date());
    };
    // Only run on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
