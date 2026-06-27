"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedController = void 0;
const seed_service_1 = require("../services/seed.service");
const response_1 = require("../utils/response");
const Topic_1 = require("../models/Topic");
const Vocabulary_1 = require("../models/Vocabulary");
exports.seedController = {
    /** GET /api/seed/definitions — list all seedable topics */
    getDefinitions: (_req, res) => {
        const defs = seed_service_1.seedService.getDefinitions().map((d) => ({
            title: d.title,
            description: d.description,
            targetWordCount: d.targetWordCount || 25,
            levels: d.levels,
        }));
        (0, response_1.success)(res, defs);
    },
    /** POST /api/seed/topic — seed a single topic */
    seedTopic: async (req, res) => {
        try {
            const { title } = req.body;
            if (!title) {
                (0, response_1.error)(res, "Missing required field: title", 400);
                return;
            }
            const defs = seed_service_1.seedService.getDefinitions();
            const def = defs.find((d) => d.title === title);
            if (!def) {
                (0, response_1.error)(res, `Unknown topic: "${title}". Use GET /api/seed/definitions to see available topics.`, 404);
                return;
            }
            const result = await seed_service_1.seedService.seedTopic(def);
            (0, response_1.created)(res, result);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    /** POST /api/seed/all — seed all predefined topics */
    seedAll: async (_req, res) => {
        try {
            const results = await seed_service_1.seedService.seedAll();
            const total = results.reduce((s, r) => s + r.wordsCreated, 0);
            (0, response_1.created)(res, {
                topics: results.length,
                totalWordsCreated: total,
                details: results,
            });
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    /** POST /api/seed/reseed — drop all vocabulary & topics, then re-seed from word bank */
    reseed: async (_req, res) => {
        try {
            await Vocabulary_1.Vocabulary.deleteMany({});
            await Topic_1.Topic.deleteMany({});
            const results = await seed_service_1.seedService.seedAll();
            const total = results.reduce((s, r) => s + r.wordsCreated, 0);
            (0, response_1.created)(res, {
                topics: results.length,
                totalWordsCreated: total,
                details: results,
            });
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    /** POST /api/seed/topic/:id — seed more words into an existing topic via API */
    seedIntoTopic: async (req, res) => {
        try {
            const id = req.params.id;
            const { keyword, count = 20 } = req.body;
            if (!keyword) {
                (0, response_1.error)(res, "Missing field: keyword", 400);
                return;
            }
            const createdCount = await seed_service_1.seedService.seedIntoTopic(id, keyword, count);
            (0, response_1.success)(res, { created: createdCount });
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
};
//# sourceMappingURL=seed.controller.js.map