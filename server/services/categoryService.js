import Category from '../models/Category.js';

export const getCategories = async () => {
  return await Category.find({}).sort({ name: 1 });
};

export const createCategory = async ({ name, description, imageUrl }) => {
  const existing = await Category.findOne({ name });
  if (existing) throw new Error('Category with this name already exists');
  return await Category.create({ name, description, imageUrl });
};

export const updateCategory = async (id, updateData) => {
  const category = await Category.findByIdAndUpdate(id, updateData, { new: true });
  if (!category) throw new Error('Category not found');
  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new Error('Category not found');
  return { message: 'Category deleted successfully' };
};
