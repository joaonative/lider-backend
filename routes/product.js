import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createProduct,
  editProduct,
  listAllProducts,
  listProductsByCategory,
} from "../controllers/productController.js";

const router = express.Router();

router.put("/:id", authMiddleware, editProduct);
router.post("/", authMiddleware, createProduct);
router.get("/", listAllProducts);
router.get("/:category", listProductsByCategory);

export default router;
