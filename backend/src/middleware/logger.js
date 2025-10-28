/**
 * Request logging middleware
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, url, ip } = req;
  const userAgent = req.get('User-Agent') || 'Unknown';
  
  // Log request
  console.log(`[${new Date().toISOString()}] ${method} ${url} - ${ip}`);
  
  // Override res.json to log response
  const originalJson = res.json;
  res.json = function(data) {
    const duration = Date.now() - start;
    const { statusCode } = res;
    
    // Log response
    console.log(`[${new Date().toISOString()}] ${method} ${url} - ${statusCode} - ${duration}ms`);
    
    // Call original json method
    return originalJson.call(this, data);
  };
  
  next();
};

/**
 * Error logging utility
 */
export const logError = (error, req = null) => {
  const timestamp = new Date().toISOString();
  const requestInfo = req ? `${req.method} ${req.url}` : 'Unknown request';
  
  console.error(`[${timestamp}] ERROR in ${requestInfo}:`);
  console.error(`Message: ${error.message}`);
  console.error(`Stack: ${error.stack}`);
  
  if (req?.user) {
    console.error(`User: ${req.user._id} (${req.user.role})`);
  }
};