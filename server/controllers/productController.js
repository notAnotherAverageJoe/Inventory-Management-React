const Product = require("../models/productModel");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new product
const createProduct = async (req, res) => {
  try {
    const { name, sku, price, quantity, category } = req.body;
    const newProduct = await Product.addProduct({
      name,
      sku,
      price,
      quantity,
      category,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getProducts,
  createProduct,
};
