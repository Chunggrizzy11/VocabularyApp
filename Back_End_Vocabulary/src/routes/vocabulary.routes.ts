import { Router } from "express";
import { vocabularyController } from "../controllers/vocabulary.controller";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.get("/", vocabularyController.getAll);
router.get("/search", vocabularyController.search);
router.get("/due-review", vocabularyController.getDueForReview);
router.get("/:id", vocabularyController.getById);
router.post("/", validateRequest(["topicId", "word", "meaning", "phonetic"]), vocabularyController.create);
router.put("/:id", vocabularyController.update);
router.delete("/:id", vocabularyController.delete);

export default router;
