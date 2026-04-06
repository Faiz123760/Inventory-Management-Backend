const express = require('express');
const router = express.Router();
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categories');

// GET /api/categories - Get all categories
router.get('/', getCategories);

// GET /api/categories/:id - Get single category
router.get('/:id', getCategory);

// POST /api/categories - Create new category
router.post('/', createCategory);

// PUT /api/categories/:id - Update category
router.put('/:id', updateCategory);

// DELETE /api/categories/:id - Delete category
router.delete('/:id', deleteCategory);

module.exports = router;