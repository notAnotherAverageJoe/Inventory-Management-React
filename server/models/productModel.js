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

// Export the functions
module.exports = {
  getAllProducts,
  addProduct,
};
