import { asyncHandler } from "../middleware/asyncHandler.js";
import { platformStats, listAllUsersWithPrompts } from "../services/adminService.js";

export const getStats = asyncHandler(async (req, res) => {
  res.json(await platformStats());
});

export const listUsersAdmin = asyncHandler(async (req, res) => {
  const users = await listAllUsersWithPrompts();
  res.json(users);
});
