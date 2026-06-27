import { Router } from "express";
import { topicController } from "../controllers/topic.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { protect, requireAdmin } from "../middlewares/auth";

const router = Router();

router.get("/", protect, topicController.getAll);
router.get("/:id", protect, topicController.getById);
router.post("/", protect, requireAdmin, validateRequest(["title", "description"]), topicController.create);
router.put("/:id", protect, requireAdmin, topicController.update);
router.delete("/:id", protect, requireAdmin, topicController.delete);

export default router;
