import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { getMe, getUser, getUsersAdmin } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.get("/:id", protect, getUser);
router.get("/", protect, adminOnly, getUsersAdmin);

export default router;
