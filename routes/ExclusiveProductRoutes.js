import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ExclusiveProductController.js";

const router = express.Router();



// GET  /api/products
router.get("/", getAllProducts);

// GET  /api/products/:id
router.get("/:id", getProductById);

// POST /api/products
router.post("/", createProduct);

// PUT  /api/products/:id
router.put("/:id", updateProduct);

// DELETE /api/products/:id  (soft delete)
router.delete("/:id", deleteProduct);

export default router;