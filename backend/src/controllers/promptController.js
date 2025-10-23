import { asyncHandler } from "../middleware/asyncHandler.js";
import { createPrompt, listUserPrompts } from "../services/promptService.js";

export const submitPrompt = asyncHandler(async (req, res) => {
  const { category_id, sub_category_id, prompt } = req.body;
  const created = await createPrompt({
    user_id: req.user._id,
    category_id,
    sub_category_id,
    prompt,
  });
  res.status(201).json(created);
});

export const getMyPrompts = asyncHandler(async (req, res) => {
  const items = await listUserPrompts(req.user._id);
  res.json(items);
});

export const getUserPromptsAdmin = asyncHandler(async (req, res) => {
  const items = await listUserPrompts(req.params.userId);
  res.json(items);
});
