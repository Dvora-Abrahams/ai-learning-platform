import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { getStats, listUsersAdmin, getUserPromptsAdmin, deleteUserAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, getStats);
router.get("/users", protect, adminOnly, listUsersAdmin);
router.get("/users/:userId/prompts", protect, adminOnly, getUserPromptsAdmin);
router.delete("/users/:userId", protect, adminOnly, deleteUserAdmin);

export default router;
