import { asyncHandler } from "../middleware/asyncHandler.js";
import { platformStats, listAllUsersWithPrompts, deleteUserById } from "../services/adminService.js";
import { listUserPrompts } from "../services/promptService.js";

export const getStats = asyncHandler(async (req, res) => {
  res.json(await platformStats());
});

export const listUsersAdmin = asyncHandler(async (req, res) => {
  console.log('Admin: Loading users...');
  const { page = 1, limit = 10, search = '', role = '' } = req.query;
  const result = await listAllUsersWithPrompts(Number(page), Number(limit), search, role);
  console.log('Admin: Found users:', result.users.length, 'Total:', result.pagination.total);
  res.json(result);
});

export const getUserPromptsAdmin = asyncHandler(async (req, res) => {
  console.log('Admin: Loading prompts for user:', req.params.userId);
  const prompts = await listUserPrompts(req.params.userId);
  console.log('Admin: Found prompts:', prompts.length);
  res.json(prompts);
});

export const deleteUserAdmin = asyncHandler(async (req, res) => {
  console.log('Admin: Deleting user:', req.params.userId);
  await deleteUserById(req.params.userId);
  res.json({ message: 'User deleted successfully' });
});
