# Inventory Management System - Backend

A backend API for inventory management built with Express.js and PostgreSQL.

## Features

- REST API for categories and items
- Full CRUD operations
- PostgreSQL database
- Admin password protection for delete operations

## Setup (Local Development)

1. Install PostgreSQL and create a database.

   Using psql or pgAdmin:
   ```sql
   CREATE DATABASE inventory_db;
   ```

2. Clone or download the project.

3. Install dependencies:
   ```
   npm install
   ```

4. Set up environment variables in `.env` (copy from `.env.example`):
   ```
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/inventory_db
   ```

5. Initialize the database:
   ```
   npm run init-db
   ```

6. Start the server:
   ```
   npm run dev  # for development with nodemon
   # or
   npm start    # for production
   ```

7. API will be available at http://localhost:5000/api

## Deployment

This backend is configured for deployment on Render.

1. Push code to GitHub.
2. Create a new Web Service on Render, connect your repo.
3. Set environment variables: `DATABASE_URL` (from Render's PostgreSQL instance).
4. Deploy. The service will run `npm start`.
5. After deployment, initialize the database by running `npm run init-db` in Render's shell or as a background job.

## API Endpoints

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `GET /api/categories/:id` - Get category by ID
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category (requires password)
- Similar endpoints for `/api/items`

## Database Schema

- **Categories**: id, name, description
- **Items**: id, name, description, price, quantity, category_id

## API Endpoints

- GET /api/categories - Get all categories
- POST /api/categories - Create category
- GET /api/categories/:id - Get category
- PUT /api/categories/:id - Update category
- DELETE /api/categories/:id - Delete category

- GET /api/items - Get all items
- POST /api/items - Create item
- GET /api/items/:id - Get item
- PUT /api/items/:id - Update item
- DELETE /api/items/:id - Delete item
- GET /api/items/category/:categoryId - Get items by category

## Admin Password

The admin password for delete operations is `admin123`.

## Deployment

For deployment, update the DATABASE_URL to your production PostgreSQL instance and run the init script.