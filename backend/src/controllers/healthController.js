import mongoose from 'mongoose';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

/**
 * Health check endpoint
 */
export const healthCheck = asyncHandler(async (req, res) => {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
    services: {
      database: 'checking...',
      openai: 'checking...'
    }
  };

  // Check database connection
  try {
    if (mongoose.connection.readyState === 1) {
      health.services.database = 'connected';
    } else {
      health.services.database = 'disconnected';
      health.status = 'DEGRADED';
    }
  } catch (error) {
    health.services.database = 'error';
    health.status = 'DEGRADED';
  }

  // Check OpenAI availability
  try {
    if (process.env.OPENAI_API_KEY) {
      health.services.openai = 'configured';
    } else {
      health.services.openai = 'not configured';
      health.status = 'DEGRADED';
    }
  } catch (error) {
    health.services.openai = 'error';
    health.status = 'DEGRADED';
  }

  const statusCode = health.status === 'OK' ? 200 : 503;
  const response = ApiResponse.success(health, `System is ${health.status}`, statusCode);
  
  res.status(statusCode).json(response);
});

/**
 * Detailed system info (admin only)
 */
export const systemInfo = asyncHandler(async (req, res) => {
  const info = {
    system: {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
      }
    },
    database: {
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      host: mongoose.connection.host,
      name: mongoose.connection.name
    },
    environment: {
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT,
      hasOpenAI: !!process.env.OPENAI_API_KEY
    }
  };

  const response = ApiResponse.success(info, 'System information retrieved');
  res.json(response);
});