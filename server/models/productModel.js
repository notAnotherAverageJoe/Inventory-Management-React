const pool = require("../config/db");

// Query to get all products
const getAllProducts = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};

// Query to add a product
const addProduct = async ({ name, sku, price, quantity, category }) => {
  const result = await pool.query(
    "INSERT INTO products (name, sku, price, quantity, category) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, sku, price, quantity, category]
  );
  return result.rows[0];
};

// Query to update a product by ID
const updateProduct = async ({ id, name, sku, price, quantity, category }) => {
  const result = await pool.query(
    "UPDATE products SET name = $1, sku = $2, price = $3, quantity = $4, category = $5 WHERE id = $6 RETURNING *",
    [name, sku, price, quantity, category, id]
  );
  return result.rows[0];
};

// Query to delete a product by ID
const deleteProduct = async (id) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
