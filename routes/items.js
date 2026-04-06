const express = require('express');
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem, getItemsByCategory } = require('../controllers/items');

// GET /api/items - Get all items
router.get('/', getItems);

// GET /api/items/category/:categoryId - Get items by category
router.get('/category/:categoryId', getItemsByCategory);

// GET /api/items/:id - Get single item
router.get('/:id', getItem);

// POST /api/items - Create new item
router.post('/', createItem);

// PUT /api/items/:id - Update item
router.put('/:id', updateItem);

// DELETE /api/items/:id - Delete item
router.delete('/:id', deleteItem);

module.exports = router;