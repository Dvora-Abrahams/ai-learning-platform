import { SubCategory } from "../models/SubCategory.js";

export const listSubByCategory = async (categoryId) =>
  SubCategory.find({ category_id: categoryId }).sort({ name: 1 });

export const createSubCategory = async ({ name, category_id }) =>
  SubCategory.create({ name, category_id });

export const getSubCategoryById = async (id) => {
  return SubCategory.findById(id);
};