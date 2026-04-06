const pool = require('./models/db');
const { categoryTableSql } = require('./models/categoryModel');
const { itemTableSql } = require('./models/itemModel');
require('dotenv').config();

const initDb = async () => {
  try {
    await pool.query(categoryTableSql);
    await pool.query(itemTableSql);

    await pool.query(
      `INSERT INTO categories (name, description)
       VALUES ($1, $2), ($3, $4), ($5, $6)
       ON CONFLICT (name) DO NOTHING`,
      [
        'Electronics', 'Electronic devices and accessories',
        'Clothing', 'Apparel and fashion items',
        'Books', 'Books and publications',
      ]
    );

    await pool.query(
      `INSERT INTO items (name, description, price, quantity, category_id)
       VALUES
         ($1, $2, $3, $4, $5),
         ($6, $7, $8, $9, $10),
         ($11, $12, $13, $14, $15)
       ON CONFLICT (name, category_id) DO NOTHING`,
      [
        'Laptop', 'High-performance laptop', 999.99, 10, 1,
        'T-shirt', 'Cotton t-shirt', 19.99, 50, 2,
        'Novel', 'Fiction book', 12.99, 25, 3,
      ]
    );

    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await pool.end();
  }
};

initDb();