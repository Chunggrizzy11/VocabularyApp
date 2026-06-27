import { Router } from "express";
import { vocabularyController } from "../controllers/vocabulary.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { protect, requireAdmin } from "../middlewares/auth";

const router = Router();

router.get("/", protect, vocabularyController.getAll);
router.get("/search", protect, vocabularyController.search);
router.get("/due-review", protect, vocabularyController.getDueForReview);
router.get("/:id", protect, vocabularyController.getById);
router.post("/", protect, requireAdmin, validateRequest(["topicId", "word", "meaning", "phonetic"]), vocabularyController.create);
router.put("/:id", protect, requireAdmin, vocabularyController.update);
router.delete("/:id", protect, requireAdmin, vocabularyController.delete);

export default router;
