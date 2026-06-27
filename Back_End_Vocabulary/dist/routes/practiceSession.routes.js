"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const practiceSession_controller_1 = require("../controllers/practiceSession.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/", auth_1.protect, practiceSession_controller_1.practiceSessionController.create);
router.get("/", auth_1.protect, practiceSession_controller_1.practiceSessionController.getHistory);
router.get("/stats", auth_1.protect, practiceSession_controller_1.practiceSessionController.getStats);
exports.default = router;
//# sourceMappingURL=practiceSession.routes.js.map