"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizService = void 0;
const quiz_repository_1 = require("../repositories/quiz.repository");
exports.quizService = {
    getAll: () => quiz_repository_1.quizRepository.findAll(),
    getById: (id) => quiz_repository_1.quizRepository.findById(id),
};
//# sourceMappingURL=quiz.service.js.map