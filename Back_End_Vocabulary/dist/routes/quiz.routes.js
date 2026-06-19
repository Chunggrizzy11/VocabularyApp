"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_controller_1 = require("../controllers/quiz.controller");
const router = (0, express_1.Router)();
router.get("/", quiz_controller_1.quizController.getAll);
router.get("/:id", quiz_controller_1.quizController.getById);
exports.default = router;
//# sourceMappingURL=quiz.routes.js.map