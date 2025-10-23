import { Category } from "../models/Category.js";

export const listCategories = async () =>
  Category.find().sort({ name: 1 });

export const createCategory = async (name) =>
  Category.create({ name });
