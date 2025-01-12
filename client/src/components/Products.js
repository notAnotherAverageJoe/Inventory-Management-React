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

  // Fetch products from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

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
    <div>
      <h1>Product List</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {editingProduct && editingProduct.id === product.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="Product Name"
                />
                <input
                  type="text"
                  name="sku"
                  value={newProduct.sku}
                  onChange={handleInputChange}
                  placeholder="SKU"
                />
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                />
                <input
                  type="number"
                  name="quantity"
                  value={newProduct.quantity}
                  onChange={handleInputChange}
                  placeholder="Quantity"
                />
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                />
                <button onClick={updateProduct}>Save</button>
              </>
            ) : (
              <>
                <span>
                  {product.name} - ${product.price}
                </span>
                <button onClick={() => startEditing(product)}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
