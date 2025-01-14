const Product = require("../models/productModel");

// Fetch all products for internal use
const getRawProducts = async () => {
  try {
    const products = await Product.getAllProducts();
    return products;
  } catch (err) {
    console.error("Error fetching products in getRawProducts:", err.message);
    throw new Error("Error fetching products: " + err.message);
  }
};

// Controller method for API response
const getProducts = async (req, res) => {
  try {
    const products = await getRawProducts();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json(products); // Send response to client
  } catch (err) {
    console.error("Error in getProducts:", err.message);
    return res
      .status(500)
      .json({ error: "Server error while fetching products" });
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
    console.error("Error in createProduct:", err.message);
    res.status(500).json({ error: "Server error while creating product" });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, price, quantity, category } = req.body;

    const updatedProduct = await Product.updateProduct({
      id,
      name,
      sku,
      price,
      quantity,
      category,
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error("Error in updateProduct:", err.message);
    res.status(500).json({ error: "Server error while updating product" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (err) {
    console.error("Error in deleteProduct:", err.message);
    res.status(500).json({ error: "Server error while deleting product" });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getRawProducts,
};
