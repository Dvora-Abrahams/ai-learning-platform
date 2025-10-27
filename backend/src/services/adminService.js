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
 * Get all users (simplified)
 */
export const listAllUsersWithPrompts = async (page = 1, limit = 10, search = '', role = '') => {
  const skip = (page - 1) * limit;
  
  // Build filter
  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } }
    ];
  }
  if (role) {
    filter.role = role;
  }
  
  const [users, total] = await Promise.all([
    User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    User.countDocuments(filter)
  ]);
  
  return {
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Delete user and all related data
 */
export const deleteUserById = async (userId) => {
  // Delete user's prompts first
  await Prompt.deleteMany({ user_id: userId });
  
  // Delete the user
  const deletedUser = await User.findByIdAndDelete(userId);
  
  if (!deletedUser) {
    throw new Error('User not found');
  }
  
  return deletedUser;
};
