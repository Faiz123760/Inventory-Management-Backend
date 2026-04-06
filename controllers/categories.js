const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  countItemsInCategory,
} = require('../models/categoryModel');

// Get all categories
const getCategories = async (req, res) => {
  try {
    const result = await getAllCategories();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single category
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getCategoryById(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create category
const createCategoryHandler = async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await createCategory({ name, description });
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update category
const updateCategoryHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const result = await updateCategory({ id, name, description });
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete category
const deleteCategoryHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const itemsResult = await countItemsInCategory(id);
    if (parseInt(itemsResult.rows[0].count) > 0) {
      return res.status(400).json({ error: 'Cannot delete category with items. Delete items first.' });
    }
    const result = await deleteCategory(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory: createCategoryHandler,
  updateCategory: updateCategoryHandler,
  deleteCategory: deleteCategoryHandler,
};