"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
const response_1 = require("../utils/response");
function notFound(_req, res) {
    (0, response_1.error)(res, "Route not found", 404);
}
//# sourceMappingURL=notFound.js.map