import { User } from "../models/User.js";
import { Category } from "../models/Category.js";
import { SubCategory } from "../models/SubCategory.js";
import { Prompt } from "../models/Prompt.js";

export const platformStats = async () => {
  const [users, categories, subs, prompts] = await Promise.all([
    User.countDocuments(),
    Category.countDocuments(),
    SubCategory.countDocuments(),
    Prompt.countDocuments(),
  ]);
  return { users, categories, subCategories: subs, prompts };
};

export const listAllUsersWithPrompts = async () =>
  User.find().select("-password");
