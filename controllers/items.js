const {
  getAllItems,
  getItemsByCategory: getItemsByCategoryModel,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require('../models/itemModel');

// Get all items
const getItems = async (req, res) => {
  try {
    const result = await getAllItems();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get items by category
const getItemsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const result = await getItemsByCategoryModel(categoryId);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single item
const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getItemById(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create item
const createItemHandler = async (req, res) => {
  try {
    const { name, description, price, quantity, category_id } = req.body;
    const result = await createItem({ name, description, price, quantity, category_id });
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update item
const updateItemHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, category_id } = req.body;
    const result = await updateItem({ id, name, description, price, quantity, category_id });
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete item
const deleteItemHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteItem(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getItems,
  getItem,
  createItem: createItemHandler,
  updateItem: updateItemHandler,
  deleteItem: deleteItemHandler,
  getItemsByCategory,
};