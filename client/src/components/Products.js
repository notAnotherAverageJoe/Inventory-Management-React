import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
    category: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, [products]); // You can add products as a dependency for testing purposes

  // Delete a product
  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProducts(products.filter((product) => product.id !== id));
        console.log("Product deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("There was an error deleting the product!", error);
      });
  };

  // Start editing a product
  const startEditing = (product) => {
    setEditingProduct(product);
    setNewProduct({ ...product });
  };

  // Update a product
  const updateProduct = () => {
    axios
      .put(
        `http://localhost:5000/api/products/${editingProduct.id}`,
        newProduct
      )
      .then((response) => {
        const updatedProducts = products.map((product) =>
          product.id === editingProduct.id ? response.data : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
        setNewProduct({
          name: "",
          sku: "",
          price: "",
          quantity: "",
          category: "",
        });
      })
      .catch((error) => {
        console.error("There was an error updating the product!", error);
      });
  };

  // Handle input changes for the product form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Product List</h1>

      {/* Render product list with edit and delete buttons */}
      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex justify-between items-center border p-4 rounded-lg shadow-md"
          >
            {editingProduct && editingProduct.id === product.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="Product Name"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="sku"
                  value={newProduct.sku}
                  onChange={handleInputChange}
                  placeholder="SKU"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  name="quantity"
                  value={newProduct.quantity}
                  onChange={handleInputChange}
                  placeholder="Quantity"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  onClick={updateProduct}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="font-medium">
                  {product.name} - ${product.price}
                </span>
                <button
                  onClick={() => startEditing(product)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
