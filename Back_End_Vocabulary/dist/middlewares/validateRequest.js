"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
function validateRequest(keys) {
    return (req, res, next) => {
        const missing = keys.filter((k) => !(k in req.body));
        if (missing.length > 0) {
            res.status(400).json({
                success: false,
                message: `Missing required fields: ${missing.join(", ")}`,
            });
            return;
        }
        next();
    };
}
//# sourceMappingURL=validateRequest.js.map