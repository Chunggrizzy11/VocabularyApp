"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statistics_controller_1 = require("../controllers/statistics.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.protect, statistics_controller_1.statisticsController.getUserStats);
router.get("/progress", auth_1.protect, statistics_controller_1.statisticsController.getLearningProgress);
router.get("/heatmap", auth_1.protect, statistics_controller_1.statisticsController.getHeatmapData);
exports.default = router;
//# sourceMappingURL=statistics.routes.js.map