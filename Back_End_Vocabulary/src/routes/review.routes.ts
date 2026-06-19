import { Router } from "express";
import { reviewController } from "../controllers/review.controller";

const router = Router();

router.get("/due", reviewController.getDueItems);
router.post("/results", reviewController.submitResult);

export default router;
