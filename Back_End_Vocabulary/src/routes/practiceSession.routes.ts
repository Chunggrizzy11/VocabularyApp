import { Router } from "express";
import { practiceSessionController } from "../controllers/practiceSession.controller";
import { protect } from "../middlewares/auth";

const router = Router();

router.post("/", protect, practiceSessionController.create);
router.get("/", protect, practiceSessionController.getHistory);
router.get("/stats", protect, practiceSessionController.getStats);

export default router;
