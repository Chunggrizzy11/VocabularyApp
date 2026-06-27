"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizController = void 0;
const quiz_service_1 = require("../services/quiz.service");
const response_1 = require("../utils/response");
exports.quizController = {
    getAll: async (_req, res) => {
        try {
            const quizzes = await quiz_service_1.quizService.getAll();
            (0, response_1.success)(res, quizzes);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
    getById: async (req, res) => {
        try {
            const quiz = await quiz_service_1.quizService.getById(req.params.id);
            if (!quiz)
                (0, response_1.error)(res, "Quiz not found", 404);
            (0, response_1.success)(res, quiz);
        }
        catch (e) {
            (0, response_1.error)(res, e.message);
        }
    },
};
//# sourceMappingURL=quiz.controller.js.map