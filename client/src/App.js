import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import AddProduct from "./components/AddProducts";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Welcome to the Inventory Management System</h1>

        {/* Navigation links */}
        <nav>
          <a href="/">Home</a> | <a href="/products">Products</a>
        </nav>

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
