import { Router } from "express";
import { statisticsController } from "../controllers/statistics.controller";
import { protect } from "../middlewares/auth";

const router = Router();
router.get("/", protect, statisticsController.getUserStats);
router.get("/progress", protect, statisticsController.getLearningProgress);
router.get("/heatmap", protect, statisticsController.getHeatmapData);

export default router;
