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
                (0, response_1.error)(res, "Words array is required", 400);
            }
            if (!startedAt) {
                (0, response_1.error)(res, "startedAt is required", 400);
            }
            const session = await practiceSession_service_1.practiceSessionService.create({
                words, topicId, topicName,
                startedAt: new Date(startedAt),
                userId: req.userId,
            });
            (0, response_1.success)(res, session, 201);
        }
        catch {
            (0, response_1.error)(res, "Failed to save practice session", 500);
        }
    },
    async getHistory(req, res) {
        try {
            const limit = Math.min(parseInt(req.query.limit) || 20, 100);
            const sessions = await practiceSession_service_1.practiceSessionService.getHistory(req.userId, limit);
            (0, response_1.success)(res, sessions);
        }
        catch {
            (0, response_1.error)(res, "Failed to fetch practice history", 500);
        }
    },
    async getStats(req, res) {
        try {
            const topicId = req.query.topicId;
            const stats = await practiceSession_service_1.practiceSessionService.getStats(req.userId, topicId);
            (0, response_1.success)(res, stats);
        }
        catch {
            (0, response_1.error)(res, "Failed to fetch practice stats", 500);
        }
    },
};
//# sourceMappingURL=practiceSession.controller.js.map