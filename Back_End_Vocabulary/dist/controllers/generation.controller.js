"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generationController = void 0;
const externalDictionary_service_1 = require("../services/externalDictionary.service");
const vocabulary_service_1 = require("../services/vocabulary.service");
const response_1 = require("../utils/response");
exports.generationController = {
    /**
     * POST /api/generation/preview
     * Preview generated words WITHOUT saving.
     * Body: { topic: string, count?: number, difficulty?: "easy" | "medium" | "hard" }
     */
    preview: async (req, res) => {
        try {
            const { topic, count = 10, difficulty } = req.body;
            if (!topic)
                return (0, response_1.error)(res, "Missing required field: topic", 400);
            const words = await externalDictionary_service_1.externalDictionaryService.generateForTopic(topic, count, difficulty);
            return (0, response_1.success)(res, words);
        }
        catch (e) {
            return (0, response_1.error)(res, e.message);
        }
    },
    /**
     * POST /api/generation/save
     * Generate words and save them directly to a topic.
     * Body: { topicId: string, topic: string, count?: number, difficulty?: string }
     */
    save: async (req, res) => {
        try {
            const { topicId, topic, count = 10, difficulty } = req.body;
            if (!topicId || !topic) {
                return (0, response_1.error)(res, "Missing required fields: topicId, topic", 400);
            }
            const words = await externalDictionary_service_1.externalDictionaryService.generateForTopic(topic, count, difficulty);
            if (words.length === 0) {
                return (0, response_1.error)(res, `Could not generate any words for topic "${topic}". Try a different topic name.`, 404);
            }
            // Save each word to the topic
            const saved = [];
            for (const w of words) {
                const doc = await vocabulary_service_1.vocabularyService.create({
                    topicId,
                    word: w.word,
                    phonetic: w.phonetic,
                    meaning: w.meaning,
                    partOfSpeech: w.partOfSpeech,
                    example: w.example,
                    exampleTranslation: "",
                    difficulty: difficultyToLevel(difficulty || w.partOfSpeech),
                    // Store pronunciation URL in imageUrl as a temporary field
                    // (you can add a dedicated field later)
                });
                saved.push(doc);
            }
            return (0, response_1.created)(res, {
                generated: saved.length,
                words: saved,
            });
        }
        catch (e) {
            return (0, response_1.error)(res, e.message);
        }
    },
    /**
     * GET /api/generation/lookup/:word
     * Look up a single word from the dictionary without saving.
     */
    lookup: async (req, res) => {
        try {
            const word = req.params.word;
            if (!word)
                return (0, response_1.error)(res, "Missing word parameter", 400);
            const result = await externalDictionary_service_1.externalDictionaryService.lookupWord(word);
            if (!result)
                return (0, response_1.error)(res, `Could not find word "${word}"`, 404);
            return (0, response_1.success)(res, result);
        }
        catch (e) {
            return (0, response_1.error)(res, e.message);
        }
    },
};
function difficultyToLevel(difficulty) {
    switch (difficulty) {
        case "easy": return "A1";
        case "medium": return "B1";
        case "hard": return "C1";
        default: return "A2";
    }
}
//# sourceMappingURL=generation.controller.js.map