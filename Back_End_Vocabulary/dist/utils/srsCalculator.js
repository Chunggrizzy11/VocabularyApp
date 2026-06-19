"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNextReview = calculateNextReview;
const constants_1 = require("./constants");
function calculateNextReview(currentLevel, rating) {
    const ratingToLevel = {
        again: 0,
        hard: Math.max(1, currentLevel),
        good: currentLevel + 1,
        easy: currentLevel + 2,
    };
    const newLevel = Math.min(ratingToLevel[rating], 4);
    const srsLevel = constants_1.SRS_LEVELS[newLevel];
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + srsLevel.intervalDays);
    return { level: newLevel, nextReviewAt: nextReview };
}
//# sourceMappingURL=srsCalculator.js.map