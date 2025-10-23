import { User } from "../models/User.js";

export const getUserById = async (id) =>
  User.findById(id).select("-password");

export const listUsers = async () =>
  User.find().select("-password");
