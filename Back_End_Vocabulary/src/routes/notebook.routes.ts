import { Router } from "express";
import { notebookController } from "../controllers/notebook.controller";
import { protect } from "../middlewares/auth";

const router = Router();

// Notebook CRUD
router.get("/", protect, notebookController.getAll);
router.post("/", protect, notebookController.create);
router.get("/:id", protect, notebookController.getById);
router.put("/:id", protect, notebookController.update);
router.delete("/:id", protect, notebookController.delete);

// Notebook Words
router.get("/:id/words", protect, notebookController.getWords);
router.post("/:id/words", protect, notebookController.addWord);
router.delete("/words/:wordId", protect, notebookController.removeWord);

// Notebook Review (SRS)
router.get("/:id/due", protect, notebookController.getDueWords);
router.post("/:id/review", protect, notebookController.submitReview);

// Notebook Stats
router.get("/:id/stats", protect, notebookController.getStats);

export default router;