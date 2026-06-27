"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.authController.register);
router.post("/login", auth_controller_1.authController.login);
router.get("/me", auth_1.protect, auth_controller_1.authController.getMe);
router.get("/users", auth_1.protect, auth_1.requireAdmin, auth_controller_1.authController.getUsers);
/** Dev-only: create first admin account (fails if admin already exists) */
router.post("/create-admin", auth_controller_1.authController.createAdmin);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map