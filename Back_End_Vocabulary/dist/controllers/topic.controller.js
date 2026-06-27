"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicController = void 0;
const topic_service_1 = require("../services/topic.service");
const response_1 = require("../utils/response");
exports.topicController = {
    getAll: async (_req, res) => {
        try {
            const topics = await topic_service_1.topicService.getAll();
            (0, response_1.success)(res, topics);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    getById: async (req, res) => {
        try {
            const topic = await topic_service_1.topicService.getById(req.params.id);
            if (!topic)
                (0, response_1.error)(res, "Topic not found", 404);
            (0, response_1.success)(res, topic);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    create: async (req, res) => {
        try {
            const topic = await topic_service_1.topicService.create(req.body);
            (0, response_1.created)(res, topic);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    update: async (req, res) => {
        try {
            const topic = await topic_service_1.topicService.update(req.params.id, req.body);
            if (!topic)
                (0, response_1.error)(res, "Topic not found", 404);
            (0, response_1.success)(res, topic);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    delete: async (req, res) => {
        try {
            await topic_service_1.topicService.delete(req.params.id);
            (0, response_1.noContent)(res);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
};
//# sourceMappingURL=topic.controller.js.map