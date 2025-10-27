import { asyncHandler } from "../middleware/asyncHandler.js";
import { createPrompt, listUserPrompts } from "../services/promptService.js";

export const submitPrompt = asyncHandler(async (req, res) => {
  const { category_id, sub_category_id, prompt } = req.body;
  console.log('Creating prompt for user:', req.user._id, { category_id, sub_category_id, prompt });
  const created = await createPrompt({
    user_id: req.user._id,
    category_id,
    sub_category_id,
    prompt,
  });
  console.log('Prompt created:', created._id);
  res.status(201).json(created);
});

export const getMyPrompts = asyncHandler(async (req, res) => {
  console.log('Getting prompts for user:', req.user._id);
  const items = await listUserPrompts(req.user._id);
  console.log('Found prompts:', items.length);
  res.json(items);
});

export const getUserPromptsAdmin = asyncHandler(async (req, res) => {
  const items = await listUserPrompts(req.params.userId);
  res.json(items);
});
