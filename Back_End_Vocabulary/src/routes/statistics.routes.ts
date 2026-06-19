import { Router } from "express";
import { statisticsController } from "../controllers/statistics.controller";

const router = Router();
router.get("/", statisticsController.getUserStats);
router.get("/progress", statisticsController.getLearningProgress);
router.get("/heatmap", statisticsController.getHeatmapData);

export default router;
