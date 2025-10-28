import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import promptRoutes from "./routes/promptRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
    
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { requestLogger } from "./middleware/logger.js";
import { securityHeaders, sanitizeInput } from "./middleware/security.js";
import { apiRateLimit } from "./middleware/rateLimiter.js";
import { dbPerformanceMiddleware } from "./utils/performance.js";

const app = express();

// CORS configuration for both development and production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Development origins
    const developmentOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173'
    ];
    
    // Production origin
    const productionOrigin = process.env.FRONTEND_URL;
    
    // Combine all allowed origins
    const allowedOrigins = [...developmentOrigins];
    if (productionOrigin) {
      allowedOrigins.push(productionOrigin);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(null, true); // Allow for now, can be stricter in production
    }
  },
  credentials: true
};

// Security middleware (first)
app.use(securityHeaders);

// CORS
app.use(cors(corsOptions));

// Rate limiting
app.use(apiRateLimit);

// Request logging
app.use(requestLogger);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Input sanitization
app.use(sanitizeInput);

// Performance monitoring (development only)
if (process.env.NODE_ENV === 'development') {
  app.use(dbPerformanceMiddleware);
}

console.log('📍 Loading routes...');
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/admin", adminRoutes);
console.log('✅ All routes loaded');


// Health check endpoint
import { healthCheck, systemInfo } from "./controllers/healthController.js";
import { protect, adminOnly } from "./middleware/authMiddleware.js";

app.get("/api/health", healthCheck);
app.get("/api/system", protect, adminOnly, systemInfo);

// Temporary seed endpoint
app.get("/api/seed", async (req, res) => {
  try {
    const { execSync } = await import('child_process');
    execSync('npm run seed', { cwd: process.cwd() });
    res.json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.use(notFound);
app.use(errorHandler);

export default app;
