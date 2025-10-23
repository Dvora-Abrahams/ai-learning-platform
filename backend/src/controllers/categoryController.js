import { asyncHandler } from "../middleware/asyncHandler.js";
import { listCategories, createCategory } from "../services/categoryService.js";
import { listSubByCategory, createSubCategory } from "../services/subCategoryService.js";

export const getCategories = asyncHandler(async (req, res) => {
  const items = await listCategories();
  res.json(items);
});

export const getSubCategoriesByCategory = asyncHandler(async (req, res) => {
  const subs = await listSubByCategory(req.params.id);
  res.json(subs);
});

export const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const created = await createCategory(name);
  res.status(201).json(created);
});

export const addSubCategory = asyncHandler(async (req, res) => {
  const { name, category_id } = req.body;
  const created = await createSubCategory({ name, category_id });
  res.status(201).json(created);
});
