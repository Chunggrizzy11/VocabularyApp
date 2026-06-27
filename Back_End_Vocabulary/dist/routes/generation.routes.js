"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generation_controller_1 = require("../controllers/generation.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
/**
 * Preview generated words for a topic (no save)
 * POST /api/generation/preview
 * Body: { topic: string, count?: number, difficulty?: "easy"|"medium"|"hard" }
 */
router.post("/preview", auth_1.protect, auth_1.requireAdmin, generation_controller_1.generationController.preview);
/**
 * Generate & save words to a topic
 * POST /api/generation/save
 * Body: { topicId: string, topic: string, count?: number, difficulty?: string }
 */
router.post("/save", auth_1.protect, auth_1.requireAdmin, generation_controller_1.generationController.save);
/**
 * Look up a single word from dictionary
 * GET /api/generation/lookup/:word
 */
router.get("/lookup/:word", auth_1.protect, auth_1.requireAdmin, generation_controller_1.generationController.lookup);
exports.default = router;
//# sourceMappingURL=generation.routes.js.map