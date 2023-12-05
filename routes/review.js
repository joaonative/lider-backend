import express from "express";
import { createReview } from "../controllers/review.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createReview);

export default router;
