"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const response_1 = require("../utils/response");
function errorHandler(err, _req, res, _next) {
    console.error("Error:", err.message);
    (0, response_1.error)(res, err.message || "Internal Server Error", 500);
}
//# sourceMappingURL=errorHandler.js.map