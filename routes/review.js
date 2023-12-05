import express from "express";
import { createReview, listAllReviews } from "../controllers/review.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createReview);
router.get("/", listAllReviews);

export default router;
