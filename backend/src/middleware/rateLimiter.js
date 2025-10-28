import { ApiResponse } from '../utils/apiResponse.js';

/**
 * Simple in-memory rate limiter
 */
class RateLimiter {
  constructor() {
    this.requests = new Map();
    this.cleanup();
  }
  
  isAllowed(key, limit, windowMs) {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    
    const userRequests = this.requests.get(key);
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => time > windowStart);
    this.requests.set(key, validRequests);
    
    if (validRequests.length >= limit) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    return true;
  }
  
  cleanup() {
    // Clean up old entries every 10 minutes
    setInterval(() => {
      const now = Date.now();
      const oneHourAgo = now - 60 * 60 * 1000;
      
      for (const [key, requests] of this.requests.entries()) {
        const validRequests = requests.filter(time => time > oneHourAgo);
        if (validRequests.length === 0) {
          this.requests.delete(key);
        } else {
          this.requests.set(key, validRequests);
        }
      }
    }, 10 * 60 * 1000);
  }
}

const rateLimiter = new RateLimiter();

/**
 * Rate limiting middleware factory
 */
export const createRateLimit = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100, // limit each IP to 100 requests per windowMs
    message = 'Too many requests, please try again later',
    keyGenerator = (req) => req.ip
  } = options;
  
  return (req, res, next) => {
    const key = keyGenerator(req);
    
    if (!rateLimiter.isAllowed(key, max, windowMs)) {
      const response = ApiResponse.error(message, 429);
      return res.status(429).json(response);
    }
    
    next();
  };
};

// Predefined rate limiters
export const authRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'development' ? 50 : 10, // More attempts in development
  message: 'Too many authentication attempts, please try again later'
});

export const apiRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'development' ? 1000 : 100, // More requests in development
  message: 'Too many API requests, please try again later'
});

export const aiRateLimit = createRateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: process.env.NODE_ENV === 'development' ? 100 : 10, // More AI requests in development
  message: 'Too many AI requests, please wait before asking again',
  keyGenerator: (req) => req.user?._id || req.ip
});