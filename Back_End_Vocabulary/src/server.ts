import express from "express";
import cors from "cors";
import { env } from "./configs/env";
import { connectDatabase } from "./configs/database";

import topicRoutes from "./routes/topic.routes";
import vocabularyRoutes from "./routes/vocabulary.routes";
import reviewRoutes from "./routes/review.routes";
import quizRoutes from "./routes/quiz.routes";
import statisticsRoutes from "./routes/statistics.routes";
import generationRoutes from "./routes/generation.routes";
import seedRoutes from "./routes/seed.routes";

import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "API running" });
});

app.use("/api/topics", topicRoutes);
app.use("/api/vocabulary", vocabularyRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/generation", generationRoutes);
app.use("/api/seed", seedRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  await connectDatabase();
  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
}

start();
