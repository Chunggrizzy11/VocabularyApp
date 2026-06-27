import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { protect, requireAdmin } from "../middlewares/auth";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", protect, authController.getMe);
router.get("/users", protect, requireAdmin, authController.getUsers);

/** Dev-only: create first admin account (fails if admin already exists) */
router.post("/create-admin", authController.createAdmin);

export default router;
