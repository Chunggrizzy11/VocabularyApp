import { Router } from "express";
import { practiceSessionController } from "../controllers/practiceSession.controller";

const router = Router();

router.post("/", practiceSessionController.create);
router.get("/", practiceSessionController.getHistory);
router.get("/stats", practiceSessionController.getStats);

export default router;
