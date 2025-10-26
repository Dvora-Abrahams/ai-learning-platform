import { asyncHandler } from "../middleware/asyncHandler.js";
import { getUserById, listUsers } from "../services/userService.js";

export const getMe = asyncHandler(async (req, res) => {
  const me = await getUserById(req.user._id);
  res.json(me);
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

export const getUsersAdmin = asyncHandler(async (req, res) => {
  const users = await listUsers();
  res.json(users);
});
