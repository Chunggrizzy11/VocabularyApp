"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.practiceSessionController = void 0;
const practiceSession_service_1 = require("../services/practiceSession.service");
const response_1 = require("../utils/response");
exports.practiceSessionController = {
    async create(req, res) {
        try {
            const { words, topicId, topicName, startedAt } = req.body;
            if (!words || !Array.isArray(words) || words.length === 0) {
                return (0, response_1.error)(res, "Words array is required", 400);
            }
            if (!startedAt) {
                return (0, response_1.error)(res, "startedAt is required", 400);
            }
            const session = await practiceSession_service_1.practiceSessionService.create({
                words, topicId, topicName,
                startedAt: new Date(startedAt),
            });
            return (0, response_1.success)(res, session, 201);
        }
        catch {
            return (0, response_1.error)(res, "Failed to save practice session", 500);
        }
    },
    async getHistory(req, res) {
        try {
            const limit = Math.min(parseInt(req.query.limit) || 20, 100);
            const sessions = await practiceSession_service_1.practiceSessionService.getHistory(limit);
            return (0, response_1.success)(res, sessions);
        }
        catch {
            return (0, response_1.error)(res, "Failed to fetch practice history", 500);
        }
    },
    async getStats(req, res) {
        try {
            const topicId = req.query.topicId;
            const stats = await practiceSession_service_1.practiceSessionService.getStats(topicId);
            return (0, response_1.success)(res, stats);
        }
        catch {
            return (0, response_1.error)(res, "Failed to fetch practice stats", 500);
        }
    },
};
//# sourceMappingURL=practiceSession.controller.js.map