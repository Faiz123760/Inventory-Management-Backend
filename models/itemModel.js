const pool = require('./db');

const itemTableSql = `
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (name, category_id)
);
`;

const getAllItems = () =>
  pool.query(`
    SELECT items.*, categories.name as category_name
    FROM items
    JOIN categories ON items.category_id = categories.id
    ORDER BY items.name
  `);

const getItemsByCategory = (categoryId) =>
  pool.query(`
    SELECT items.*, categories.name as category_name
    FROM items
    JOIN categories ON items.category_id = categories.id
    WHERE items.category_id = $1
    ORDER BY items.name
  `, [categoryId]);

const getItemById = (id) =>
  pool.query(`
    SELECT items.*, categories.name as category_name
    FROM items
    JOIN categories ON items.category_id = categories.id
    WHERE items.id = $1
  `, [id]);

const createItem = ({ name, description, price, quantity, category_id }) =>
  pool.query(
    'INSERT INTO items (name, description, price, quantity, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, description, price, quantity, category_id]
  );

const updateItem = ({ id, name, description, price, quantity, category_id }) =>
  pool.query(
    'UPDATE items SET name = $1, description = $2, price = $3, quantity = $4, category_id = $5 WHERE id = $6 RETURNING *',
    [name, description, price, quantity, category_id, id]
  );

const deleteItem = (id) => pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);

module.exports = {
  itemTableSql,
  getAllItems,
  getItemsByCategory,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
