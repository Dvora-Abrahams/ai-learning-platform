/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  static timers = new Map();
  
  static start(label) {
    this.timers.set(label, Date.now());
  }
  
  static end(label) {
    const startTime = this.timers.get(label);
    if (!startTime) {
      console.warn(`Timer '${label}' was not started`);
      return 0;
    }
    
    const duration = Date.now() - startTime;
    this.timers.delete(label);
    
    console.log(`⏱️  ${label}: ${duration}ms`);
    return duration;
  }
  
  static async measure(label, asyncFn) {
    this.start(label);
    try {
      const result = await asyncFn();
      this.end(label);
      return result;
    } catch (error) {
      this.end(label);
      throw error;
    }
  }
}

/**
 * Database query performance middleware
 */
export const dbPerformanceMiddleware = (req, res, next) => {
  const originalQuery = req.query;
  
  // Add query timing for development
  if (process.env.NODE_ENV === 'development') {
    const queryLabel = `DB Query - ${req.method} ${req.path}`;
    PerformanceMonitor.start(queryLabel);
    
    const originalJson = res.json;
    res.json = function(data) {
      PerformanceMonitor.end(queryLabel);
      return originalJson.call(this, data);
    };
  }
  
  next();
};