import express from "express";
import {
  createProduct,
  editProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.put("/:id", editProduct);
router.post("/", createProduct);

export default router;
