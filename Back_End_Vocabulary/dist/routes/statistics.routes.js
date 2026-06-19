"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statistics_controller_1 = require("../controllers/statistics.controller");
const router = (0, express_1.Router)();
router.get("/", statistics_controller_1.statisticsController.getUserStats);
router.get("/progress", statistics_controller_1.statisticsController.getLearningProgress);
router.get("/heatmap", statistics_controller_1.statisticsController.getHeatmapData);
exports.default = router;
//# sourceMappingURL=statistics.routes.js.map