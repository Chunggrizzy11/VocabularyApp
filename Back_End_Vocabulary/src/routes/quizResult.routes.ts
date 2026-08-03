import { Router } from "express";
import { quizResultController } from "../controllers/quizResult.controller";
import { protect } from "../middlewares/auth";

const router = Router();

router.post("/", protect, quizResultController.save);

export default router;
