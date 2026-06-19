"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizRepository = void 0;
const Quiz_1 = require("../models/Quiz");
exports.quizRepository = {
    findAll: async () => Quiz_1.Quiz.find(),
    findById: async (id) => Quiz_1.Quiz.findById(id),
};
//# sourceMappingURL=quiz.repository.js.map