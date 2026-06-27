"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statisticsController = void 0;
const statistics_service_1 = require("../services/statistics.service");
const response_1 = require("../utils/response");
exports.statisticsController = {
    getUserStats: async (req, res) => {
        try {
            const stats = await statistics_service_1.statisticsService.getUserStats(req.userId);
            (0, response_1.success)(res, stats);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    getLearningProgress: async (req, res) => {
        try {
            const days = parseInt(req.query.days) || 30;
            const progress = await statistics_service_1.statisticsService.getLearningProgress(req.userId, days);
            (0, response_1.success)(res, progress);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    getHeatmapData: async (req, res) => {
        try {
            const year = parseInt(req.query.year) || undefined;
            const data = await statistics_service_1.statisticsService.getHeatmapData(req.userId, year);
            (0, response_1.success)(res, data);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
};
//# sourceMappingURL=statistics.controller.js.map