import { Router } from "express";
import { generationController } from "../controllers/generation.controller";
import { protect, requireAdmin } from "../middlewares/auth";

const router = Router();

/**
 * Preview generated words for a topic (no save)
 * POST /api/generation/preview
 * Body: { topic: string, count?: number, difficulty?: "easy"|"medium"|"hard" }
 */
router.post("/preview", protect, requireAdmin, generationController.preview);

/**
 * Generate & save words to a topic
 * POST /api/generation/save
 * Body: { topicId: string, topic: string, count?: number, difficulty?: string }
 */
router.post("/save", protect, requireAdmin, generationController.save);

/**
 * Look up a single word from dictionary
 * GET /api/generation/lookup/:word
 */
router.get("/lookup/:word", protect, requireAdmin, generationController.lookup);

export default router;
