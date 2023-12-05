import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createProduct,
  editProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.put("/:id", authMiddleware, editProduct);
router.post("/", authMiddleware, createProduct);

export default router;
