import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  getCategories,
  getSubCategoriesByCategory,
  addCategory,
  addSubCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// Public
router.get("/", getCategories);
router.get("/:id/subcategories", getSubCategoriesByCategory);

// Admin-only CRUD minimal
router.post("/", protect, adminOnly, addCategory);
router.post("/sub", protect, adminOnly, addSubCategory);

export default router;
