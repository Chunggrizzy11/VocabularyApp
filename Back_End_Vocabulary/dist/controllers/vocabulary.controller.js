"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vocabularyController = void 0;
const vocabulary_service_1 = require("../services/vocabulary.service");
const response_1 = require("../utils/response");
exports.vocabularyController = {
    getAll: async (req, res) => {
        try {
            const topicId = req.query.topicId;
            const words = await vocabulary_service_1.vocabularyService.getAll(topicId);
            (0, response_1.success)(res, words);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    getById: async (req, res) => {
        try {
            const word = await vocabulary_service_1.vocabularyService.getById(req.params.id);
            if (!word)
                (0, response_1.error)(res, "Word not found", 404);
            (0, response_1.success)(res, word);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    search: async (req, res) => {
        try {
            const results = await vocabulary_service_1.vocabularyService.search(req.query.q);
            (0, response_1.success)(res, results);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    create: async (req, res) => {
        try {
            const word = await vocabulary_service_1.vocabularyService.create(req.body);
            (0, response_1.created)(res, word);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    update: async (req, res) => {
        try {
            const word = await vocabulary_service_1.vocabularyService.update(req.params.id, req.body);
            if (!word)
                (0, response_1.error)(res, "Word not found", 404);
            (0, response_1.success)(res, word);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    delete: async (req, res) => {
        try {
            await vocabulary_service_1.vocabularyService.delete(req.params.id);
            (0, response_1.noContent)(res);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    getDueForReview: async (_req, res) => {
        try {
            const items = await vocabulary_service_1.vocabularyService.getDueForReview();
            (0, response_1.success)(res, items);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
};
//# sourceMappingURL=vocabulary.controller.js.map