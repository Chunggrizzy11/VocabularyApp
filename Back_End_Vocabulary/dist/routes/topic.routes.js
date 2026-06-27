"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const topic_controller_1 = require("../controllers/topic.controller");
const validateRequest_1 = require("../middlewares/validateRequest");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.protect, topic_controller_1.topicController.getAll);
router.get("/:id", auth_1.protect, topic_controller_1.topicController.getById);
router.post("/", auth_1.protect, auth_1.requireAdmin, (0, validateRequest_1.validateRequest)(["title", "description"]), topic_controller_1.topicController.create);
router.put("/:id", auth_1.protect, auth_1.requireAdmin, topic_controller_1.topicController.update);
router.delete("/:id", auth_1.protect, auth_1.requireAdmin, topic_controller_1.topicController.delete);
exports.default = router;
//# sourceMappingURL=topic.routes.js.map