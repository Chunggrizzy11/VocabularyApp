import { Router } from "express";
import { quizController } from "../controllers/quiz.controller";
import { protect } from "../middlewares/auth";

const router = Router();
router.get("/", protect, quizController.getAll);
router.get("/:id", protect, quizController.getById);

export default router;
