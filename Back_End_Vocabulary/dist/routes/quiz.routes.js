"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_controller_1 = require("../controllers/quiz.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.protect, quiz_controller_1.quizController.getAll);
router.get("/:id", auth_1.protect, quiz_controller_1.quizController.getById);
exports.default = router;
//# sourceMappingURL=quiz.routes.js.map