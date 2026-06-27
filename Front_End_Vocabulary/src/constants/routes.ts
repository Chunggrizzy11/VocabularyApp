export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  TOPICS: "/topics",
  TOPIC_DETAIL: (id: string) => `/topics/${id}`,
  FLASHCARD: "/flashcard",
  REVIEW: "/review",
  QUIZ: "/quiz",
  STATISTICS: "/statistics",
  GENERATE: "/generate",
  SPEAKING: "/speaking",
  ADMIN: {
    DASHBOARD: "/admin",
    TOPICS: "/admin/topics",
    VOCABULARY: "/admin/vocabulary",
    USERS: "/admin/users",
  },
};
