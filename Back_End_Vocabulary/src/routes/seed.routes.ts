import { Router } from "express";
import { seedController } from "../controllers/seed.controller";
import { protect, requireAdmin } from "../middlewares/auth";

const router = Router();

/** GET /api/seed/definitions — list all seedable topic definitions */
router.get("/definitions", protect, requireAdmin, seedController.getDefinitions);

/** POST /api/seed/topic — seed a single topic by title */
router.post("/topic", protect, requireAdmin, seedController.seedTopic);

/** POST /api/seed/all — seed ALL predefined topics (500+ words) */
router.post("/all", protect, requireAdmin, seedController.seedAll);

/** POST /api/seed/reseed — drop all data and re-seed from word bank */
router.post("/reseed", protect, requireAdmin, seedController.reseed);

/** POST /api/seed/topic/:id — seed more words into an existing topic via external API */
router.post("/topic/:id", protect, requireAdmin, seedController.seedIntoTopic);

export default router;
