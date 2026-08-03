import { Router } from "express";
import { studySessionController } from "../controllers/studySession.controller";
import { protect } from "../middlewares/auth";

const router = Router();

router.post("/", protect, studySessionController.logSession);
router.get("/stats", protect, studySessionController.getStats);

export default router;
