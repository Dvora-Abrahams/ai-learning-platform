import { asyncHandler } from "../middleware/asyncHandler.js";
import { platformStats, listAllUsersWithPrompts } from "../services/adminService.js";
import { listUserPrompts } from "../services/promptService.js";

export const getStats = asyncHandler(async (req, res) => {
  res.json(await platformStats());
});

export const listUsersAdmin = asyncHandler(async (req, res) => {
  console.log('Admin: Loading users...');
  const users = await listAllUsersWithPrompts();
  console.log('Admin: Found users:', users.length);
  res.json(users);
});

export const getUserPromptsAdmin = asyncHandler(async (req, res) => {
  console.log('Admin: Loading prompts for user:', req.params.userId);
  const prompts = await listUserPrompts(req.params.userId);
  console.log('Admin: Found prompts:', prompts.length);
  res.json(prompts);
});
