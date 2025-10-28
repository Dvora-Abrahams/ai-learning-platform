/**
 * Standardized API Response Utility
 */
export class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.timestamp = new Date().toISOString();
  }

  static success(data, message = "Success", statusCode = 200) {
    return new ApiResponse(statusCode, data, message);
  }

  static error(message = "Error", statusCode = 500, data = null) {
    return new ApiResponse(statusCode, data, message);
  }

  static created(data, message = "Created successfully") {
    return new ApiResponse(201, data, message);
  }

  static notFound(message = "Resource not found") {
    return new ApiResponse(404, null, message);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiResponse(401, null, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiResponse(403, null, message);
  }

  static badRequest(message = "Bad request", data = null) {
    return new ApiResponse(400, data, message);
  }
}