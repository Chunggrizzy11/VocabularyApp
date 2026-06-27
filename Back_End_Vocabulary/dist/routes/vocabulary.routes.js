"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vocabulary_controller_1 = require("../controllers/vocabulary.controller");
const validateRequest_1 = require("../middlewares/validateRequest");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.protect, vocabulary_controller_1.vocabularyController.getAll);
router.get("/search", auth_1.protect, vocabulary_controller_1.vocabularyController.search);
router.get("/due-review", auth_1.protect, vocabulary_controller_1.vocabularyController.getDueForReview);
router.get("/:id", auth_1.protect, vocabulary_controller_1.vocabularyController.getById);
router.post("/", auth_1.protect, auth_1.requireAdmin, (0, validateRequest_1.validateRequest)(["topicId", "word", "meaning", "phonetic"]), vocabulary_controller_1.vocabularyController.create);
router.put("/:id", auth_1.protect, auth_1.requireAdmin, vocabulary_controller_1.vocabularyController.update);
router.delete("/:id", auth_1.protect, auth_1.requireAdmin, vocabulary_controller_1.vocabularyController.delete);
exports.default = router;
//# sourceMappingURL=vocabulary.routes.js.map