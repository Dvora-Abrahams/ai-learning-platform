import { User } from "../models/User.js";
import { Category } from "../models/Category.js";
import { SubCategory } from "../models/SubCategory.js";
import { Prompt } from "../models/Prompt.js";

/**
 * Get platform statistics
 */
export const platformStats = async () => {
  const [users, categories, subs, prompts] = await Promise.all([
    User.countDocuments(),
    Category.countDocuments(),
    SubCategory.countDocuments(),
    Prompt.countDocuments(),
  ]);

  // Get top categories by usage
  const topCategories = await Prompt.aggregate([
    {
      $group: {
        _id: "$category_id",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },
    {
      $project: {
        name: "$category.name",
        count: 1,
      },
    },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  return {
    totalUsers: users,
    totalCategories: categories,
    totalSubCategories: subs,
    totalPrompts: prompts,
    topCategories,
  };
};

/**
 * Get all users with their prompts
 */
export const listAllUsersWithPrompts = async () => {
  const users = await User.find().select("-password");

  const usersWithPrompts = await Promise.all(
    users.map(async (user) => {
      const prompts = await Prompt.find({ user_id: user._id })
        .populate("category_id", "name")
        .populate("sub_category_id", "name")
        .sort({ createdAt: -1 });

      return {
        user: user,
        promptsCount: prompts.length,
        prompts: prompts,
      };
    })
  );

  return usersWithPrompts;
};
