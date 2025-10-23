import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { getStats, listUsersAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, getStats);
router.get("/users", protect, adminOnly, listUsersAdmin);

export default router;
