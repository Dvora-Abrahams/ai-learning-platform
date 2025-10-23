import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { submitPrompt, getMyPrompts, getUserPromptsAdmin } from "../controllers/promptController.js";

const router = express.Router();

// Users
router.post("/", protect, submitPrompt);
router.get("/me", protect, getMyPrompts);

// Admin
router.get("/user/:userId", protect, adminOnly, getUserPromptsAdmin);

export default router;
