const pool = require('./db');

const categoryTableSql = `
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const getAllCategories = () => pool.query('SELECT * FROM categories ORDER BY name');
const getCategoryById = (id) => pool.query('SELECT * FROM categories WHERE id = $1', [id]);
const createCategory = ({ name, description }) =>
  pool.query('INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *', [name, description]);
const updateCategory = ({ id, name, description }) =>
  pool.query('UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *', [name, description, id]);
const deleteCategory = (id) => pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
const countItemsInCategory = (categoryId) =>
  pool.query('SELECT COUNT(*) FROM items WHERE category_id = $1', [categoryId]);

module.exports = {
  categoryTableSql,
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  countItemsInCategory,
};
