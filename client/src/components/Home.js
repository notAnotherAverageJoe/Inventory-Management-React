import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle button click and navigate to Add Product page
  const addProduct = () => {
    navigate("/add-product"); // This will redirect to a page for adding a product
  };

  return (
    <div>
      <h2>Hello from Inventory</h2>
      <h4>Placeholder</h4>

      {/* Button to add product */}
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
};

export default Home;
