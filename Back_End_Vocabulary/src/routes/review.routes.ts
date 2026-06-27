import { Router } from "express";
import { reviewController } from "../controllers/review.controller";
import { protect } from "../middlewares/auth";

const router = Router();

router.get("/due", protect, reviewController.getDueItems);
router.post("/results", protect, reviewController.submitResult);

export default router;
