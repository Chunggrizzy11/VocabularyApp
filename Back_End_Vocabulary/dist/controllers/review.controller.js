"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const review_service_1 = require("../services/review.service");
const response_1 = require("../utils/response");
exports.reviewController = {
    getDueItems: async (_req, res) => {
        try {
            const items = await review_service_1.reviewService.getDueItems();
            return (0, response_1.success)(res, items);
        }
        catch (e) {
            return (0, response_1.error)(res, e.message);
        }
    },
    submitResult: async (req, res) => {
        try {
            const { vocabularyId, rating } = req.body;
            if (!vocabularyId || !rating)
                return (0, response_1.error)(res, "vocabularyId and rating required", 400);
            await review_service_1.reviewService.submitResult(vocabularyId, rating);
            return (0, response_1.success)(res, { message: "Review recorded" });
        }
        catch (e) {
            return (0, response_1.error)(res, e.message);
        }
    },
};
//# sourceMappingURL=review.controller.js.map