import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); // hooks

  const addProduct = () => {
    navigate("/add-product"); // redirect to a page for adding a product
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Inventory WIP</h2>
      <h4 className="text-lg text-center text-gray-600 mb-6">Placeholder</h4>

      {/* Button to add product */}
      <div className="flex justify-center">
        <button
          onClick={addProduct}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default Home;
