import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { authRateLimit } from "../middleware/rateLimiter.js";
import { validate, schemas } from "../middleware/validation.js";
import { ApiResponse } from "../utils/apiResponse.js";

const router = express.Router();

// Apply rate limiting only in production
const authMiddleware = process.env.NODE_ENV === 'production' ? [authRateLimit] : [];

router.post("/register", ...authMiddleware, validate(schemas.register), registerUser);
router.post("/login", ...authMiddleware, validate(schemas.login), loginUser);
router.get("/profile", protect, (req, res) => {
  const response = ApiResponse.success({ user: req.user }, "Profile retrieved successfully");
  res.json(response);
});
router.get("/admin", protect, adminOnly, (req, res) => {
  const response = ApiResponse.success(null, "Welcome admin");
  res.json(response);
});

export default router;
