import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { logError } from "../middleware/logger.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

export const registerUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      const response = ApiResponse.badRequest("name, phone and password are required");
      return res.status(response.statusCode).json(response);
    }

    const exists = await User.findOne({ phone });
    if (exists) {
      const response = ApiResponse.badRequest("Phone already registered");
      return res.status(response.statusCode).json(response);
    }

    const user = await User.create({ name, phone, password });
    const token = signToken(user);

    const userData = {
      user: { id: user._id, name: user.name, phone: user.phone, role: user.role },
      token
    };
    
    const response = ApiResponse.created(userData, "User registered successfully");
    res.status(response.statusCode).json(response);
  } catch (err) {
    logError(err, req);
    const response = ApiResponse.error("Registration failed", 500);
    res.status(response.statusCode).json(response);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    console.log('Login attempt:', { phone, password: '***' });

    const user = await User.findOne({ phone });
    console.log('User found:', user ? { id: user._id, name: user.name, role: user.role } : 'No user found');
    
    if (!user) {
      const response = ApiResponse.unauthorized("Invalid credentials");
      return res.status(response.statusCode).json(response);
    }

    const ok = await user.comparePassword(password);
    console.log('Password check result:', ok);
    
    if (!ok) {
      const response = ApiResponse.unauthorized("Invalid credentials");
      return res.status(response.statusCode).json(response);
    }

    const token = signToken(user);
    console.log('Login successful for user:', user.name, 'Role:', user.role);
    
    const userData = {
      user: { id: user._id, name: user.name, phone: user.phone, role: user.role },
      token
    };
    
    const response = ApiResponse.success(userData, "Login successful");
    res.json(response);
  } catch (err) {
    logError(err, req);
    const response = ApiResponse.error("Login failed", 500);
    res.status(response.statusCode).json(response);
  }
};
