"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./configs/env");
const database_1 = require("./configs/database");
const topic_routes_1 = __importDefault(require("./routes/topic.routes"));
const vocabulary_routes_1 = __importDefault(require("./routes/vocabulary.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const quiz_routes_1 = __importDefault(require("./routes/quiz.routes"));
const statistics_routes_1 = __importDefault(require("./routes/statistics.routes"));
const generation_routes_1 = __importDefault(require("./routes/generation.routes"));
const seed_routes_1 = __importDefault(require("./routes/seed.routes"));
const practiceSession_routes_1 = __importDefault(require("./routes/practiceSession.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const notFound_1 = require("./middlewares/notFound");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/api/health", (_req, res) => {
    res.json({ success: true, message: "API running" });
});
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/topics", topic_routes_1.default);
app.use("/api/vocabulary", vocabulary_routes_1.default);
app.use("/api/review", review_routes_1.default);
app.use("/api/quiz", quiz_routes_1.default);
app.use("/api/statistics", statistics_routes_1.default);
app.use("/api/generation", generation_routes_1.default);
app.use("/api/seed", seed_routes_1.default);
app.use("/api/practice-sessions", practiceSession_routes_1.default);
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
async function start() {
    await (0, database_1.connectDatabase)();
    app.listen(env_1.env.port, () => {
        console.log(`Server running on http://localhost:${env_1.env.port}`);
    });
}
start();
//# sourceMappingURL=server.js.map