import { Router } from "express";
import { topicController } from "../controllers/topic.controller";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.get("/", topicController.getAll);
router.get("/:id", topicController.getById);
router.post("/", validateRequest(["name", "description"]), topicController.create);
router.put("/:id", topicController.update);
router.delete("/:id", topicController.delete);

export default router;
