import { asyncHandler } from "../middleware/asyncHandler.js";
import { createPrompt, listUserPrompts } from "../services/promptService.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { PerformanceMonitor } from "../utils/performance.js";
import { logError } from "../middleware/logger.js";

export const submitPrompt = asyncHandler(async (req, res) => {
  const { category_id, sub_category_id, prompt } = req.body;
  console.log('Creating prompt for user:', req.user._id, { category_id, sub_category_id, prompt });
  
  const created = await PerformanceMonitor.measure('AI Prompt Generation', async () => {
    return await createPrompt({
      user_id: req.user._id,
      category_id,
      sub_category_id,
      prompt,
    });
  });
  
  console.log('Prompt created:', created._id);
  const response = ApiResponse.created(created, "Prompt created successfully");
  res.status(response.statusCode).json(response);
});

export const getMyPrompts = asyncHandler(async (req, res) => {
  console.log('Getting prompts for user:', req.user._id);
  const items = await listUserPrompts(req.user._id);
  console.log('Found prompts:', items.length);
  
  const response = ApiResponse.success(items, `Found ${items.length} prompts`);
  res.json(response);
});

export const getUserPromptsAdmin = asyncHandler(async (req, res) => {
  const items = await listUserPrompts(req.params.userId);
  const response = ApiResponse.success(items, `Found ${items.length} prompts for user`);
  res.json(response);
});
