"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("../controllers/review.controller");
const router = (0, express_1.Router)();
router.get("/due", review_controller_1.reviewController.getDueItems);
router.post("/results", review_controller_1.reviewController.submitResult);
exports.default = router;
//# sourceMappingURL=review.routes.js.map