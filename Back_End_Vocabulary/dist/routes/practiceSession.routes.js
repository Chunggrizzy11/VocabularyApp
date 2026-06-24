"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const practiceSession_controller_1 = require("../controllers/practiceSession.controller");
const router = (0, express_1.Router)();
router.post("/", practiceSession_controller_1.practiceSessionController.create);
router.get("/", practiceSession_controller_1.practiceSessionController.getHistory);
router.get("/stats", practiceSession_controller_1.practiceSessionController.getStats);
exports.default = router;
//# sourceMappingURL=practiceSession.routes.js.map