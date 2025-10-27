import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

// POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "name, phone and password are required" });
    }

    const exists = await User.findOne({ phone });
    if (exists) return res.status(400).json({ message: "Phone already registered" });

    const user = await User.create({ name, phone, password });
    const token = signToken(user);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, phone: user.phone, role: user.role },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    console.log('Login attempt:', { phone, password });

    const user = await User.findOne({ phone });
    console.log('User found:', user ? { id: user._id, name: user.name, role: user.role } : 'No user found');
    
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await user.comparePassword(password);
    console.log('Password check result:', ok);
    
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(user);
    console.log('Login successful for user:', user.name, 'Role:', user.role);
    
    res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, phone: user.phone, role: user.role },
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
