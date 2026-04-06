const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL.replace('/inventory_db', '/postgres'), // connect to default db
});

const createDb = async () => {
  try {
    await client.connect();
    await client.query('CREATE DATABASE inventory_db');
    console.log('Database created successfully');
  } catch (err) {
    if (err.code === '42P04') {
      console.log('Database already exists');
    } else {
      console.error('Error creating database:', err);
    }
  } finally {
    client.end();
  }
};

createDb();