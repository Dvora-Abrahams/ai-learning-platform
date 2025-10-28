import { asyncHandler } from "../middleware/asyncHandler.js";
import { platformStats, listAllUsersWithPrompts, deleteUserById } from "../services/adminService.js";
import { listUserPrompts } from "../services/promptService.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const getStats = asyncHandler(async (req, res) => {
  const stats = await platformStats();
  const response = ApiResponse.success(stats, "Platform statistics retrieved");
  res.json(response);
});

export const listUsersAdmin = asyncHandler(async (req, res) => {
  console.log('Admin: Loading users...');
  const { page = 1, limit = 10, search = '', role = '' } = req.query;
  const result = await listAllUsersWithPrompts(Number(page), Number(limit), search, role);
  console.log('Admin: Found users:', result.users.length, 'Total:', result.pagination.total);
  
  const response = ApiResponse.success(result, `Found ${result.users.length} users`);
  res.json(response);
});

export const getUserPromptsAdmin = asyncHandler(async (req, res) => {
  console.log('Admin: Loading prompts for user:', req.params.userId);
  const prompts = await listUserPrompts(req.params.userId);
  console.log('Admin: Found prompts:', prompts.length);
  
  const response = ApiResponse.success(prompts, `Found ${prompts.length} prompts`);
  res.json(response);
});

export const deleteUserAdmin = asyncHandler(async (req, res) => {
  console.log('Admin: Deleting user:', req.params.userId);
  await deleteUserById(req.params.userId);
  
  const response = ApiResponse.success(null, 'User deleted successfully');
  res.json(response);
});
