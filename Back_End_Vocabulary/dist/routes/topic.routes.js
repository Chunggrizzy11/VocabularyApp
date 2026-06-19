"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const topic_controller_1 = require("../controllers/topic.controller");
const validateRequest_1 = require("../middlewares/validateRequest");
const router = (0, express_1.Router)();
router.get("/", topic_controller_1.topicController.getAll);
router.get("/:id", topic_controller_1.topicController.getById);
router.post("/", (0, validateRequest_1.validateRequest)(["name", "description"]), topic_controller_1.topicController.create);
router.put("/:id", topic_controller_1.topicController.update);
router.delete("/:id", topic_controller_1.topicController.delete);
exports.default = router;
//# sourceMappingURL=topic.routes.js.map