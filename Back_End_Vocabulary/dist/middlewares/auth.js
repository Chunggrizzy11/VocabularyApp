"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = protect;
exports.requireAdmin = requireAdmin;
const jwt_1 = require("../utils/jwt");
const User_1 = require("../models/User");
const response_1 = require("../utils/response");
async function protect(req, res, next) {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            (0, response_1.error)(res, "Not authorized, no token", 401);
            return;
        }
        const token = header.split(" ")[1];
        const decoded = (0, jwt_1.verifyJwt)(token);
        const user = await User_1.User.findById(decoded.userId).select("-password");
        if (!user) {
            (0, response_1.error)(res, "Not authorized, user not found", 401);
            return;
        }
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    }
    catch {
        (0, response_1.error)(res, "Not authorized, token invalid", 401);
    }
}
function requireAdmin(req, res, next) {
    if (req.userRole !== "admin") {
        (0, response_1.error)(res, "Access denied, admin only", 403);
        return;
    }
    next();
}
//# sourceMappingURL=auth.js.map