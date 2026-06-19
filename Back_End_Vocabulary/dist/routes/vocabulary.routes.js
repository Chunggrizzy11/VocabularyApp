"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vocabulary_controller_1 = require("../controllers/vocabulary.controller");
const validateRequest_1 = require("../middlewares/validateRequest");
const router = (0, express_1.Router)();
router.get("/", vocabulary_controller_1.vocabularyController.getAll);
router.get("/search", vocabulary_controller_1.vocabularyController.search);
router.get("/due-review", vocabulary_controller_1.vocabularyController.getDueForReview);
router.get("/:id", vocabulary_controller_1.vocabularyController.getById);
router.post("/", (0, validateRequest_1.validateRequest)(["topicId", "word", "meaning", "pronunciation"]), vocabulary_controller_1.vocabularyController.create);
router.put("/:id", vocabulary_controller_1.vocabularyController.update);
router.delete("/:id", vocabulary_controller_1.vocabularyController.delete);
exports.default = router;
//# sourceMappingURL=vocabulary.routes.js.map