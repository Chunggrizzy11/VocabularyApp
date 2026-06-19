"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seed_controller_1 = require("../controllers/seed.controller");
const router = (0, express_1.Router)();
/** GET /api/seed/definitions — list all seedable topic definitions */
router.get("/definitions", seed_controller_1.seedController.getDefinitions);
/** POST /api/seed/topic — seed a single topic by title */
router.post("/topic", seed_controller_1.seedController.seedTopic);
/** POST /api/seed/all — seed ALL predefined topics (500+ words) */
router.post("/all", seed_controller_1.seedController.seedAll);
/** POST /api/seed/reseed — drop all data and re-seed from word bank */
router.post("/reseed", seed_controller_1.seedController.reseed);
/** POST /api/seed/topic/:id — seed more words into an existing topic via external API */
router.post("/topic/:id", seed_controller_1.seedController.seedIntoTopic);
exports.default = router;
//# sourceMappingURL=seed.routes.js.map