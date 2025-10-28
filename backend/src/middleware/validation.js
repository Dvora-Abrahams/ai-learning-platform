import { ApiResponse } from '../utils/apiResponse.js';

/**
 * Validation middleware factory
 */
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const response = ApiResponse.badRequest(
        error.details[0].message,
        { field: error.details[0].path[0] }
      );
      return res.status(response.statusCode).json(response);
    }
    next();
  };
};

/**
 * Common validation schemas
 */
export const schemas = {
  register: {
    validate: (data) => {
      const errors = [];
      if (!data.name || data.name.length < 2) {
        errors.push({ path: ['name'], message: 'Name must be at least 2 characters' });
      }
      if (!data.phone || !/^05\d{8}$/.test(data.phone)) {
        errors.push({ path: ['phone'], message: 'Phone must be valid Israeli number (05xxxxxxxx)' });
      }
      if (!data.password || data.password.length < 6) {
        errors.push({ path: ['password'], message: 'Password must be at least 6 characters' });
      }
      
      return {
        error: errors.length > 0 ? { details: errors } : null
      };
    }
  },
  
  login: {
    validate: (data) => {
      const errors = [];
      if (!data.phone) {
        errors.push({ path: ['phone'], message: 'Phone is required' });
      }
      if (!data.password) {
        errors.push({ path: ['password'], message: 'Password is required' });
      }
      
      return {
        error: errors.length > 0 ? { details: errors } : null
      };
    }
  },
  
  prompt: {
    validate: (data) => {
      const errors = [];
      if (!data.category_id) {
        errors.push({ path: ['category_id'], message: 'Category is required' });
      }
      if (!data.sub_category_id) {
        errors.push({ path: ['sub_category_id'], message: 'Subcategory is required' });
      }
      if (!data.prompt || data.prompt.length < 5) {
        errors.push({ path: ['prompt'], message: 'Prompt must be at least 5 characters' });
      }
      
      return {
        error: errors.length > 0 ? { details: errors } : null
      };
    }
  }
};