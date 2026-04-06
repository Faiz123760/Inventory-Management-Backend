const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Log database connection
pool.on('connect', () => {
  console.log('Database connected successfully');
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected successfully');
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/categories', require('./routes/categories'));
app.use('/api/items', require('./routes/items'));

// Basic route
app.get('/', (req, res) => {
  res.send('Inventory Management API - Running on port ' + port);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { pool };