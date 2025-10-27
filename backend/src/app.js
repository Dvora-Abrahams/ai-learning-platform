import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import promptRoutes from "./routes/promptRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
    
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

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

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('📍 Loading routes...');
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/admin", adminRoutes);
console.log('✅ All routes loaded');


// ping/health
app.get("/api/health", (_, res) => res.json({ ok: true }));

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
