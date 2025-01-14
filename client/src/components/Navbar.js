import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white py-4 px-8 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="flex items-center space-x-6 lg:space-x-6">
          {/* Hamburger menu */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Navbar links */}
          <div
            className={`${isMenuOpen ? "block" : "hidden"} lg:flex space-x-6`}
          >
            <Link
              to="/"
              className="hover:text-gray-300 transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="hover:text-gray-300 transition duration-200"
            >
              Products
            </Link>
            <Link
              to="/add-product"
              className="hover:text-gray-300 transition duration-200"
            >
              Add Product
            </Link>
            <Link
              to="/report"
              className="hover:text-gray-300 transition duration-200"
            >
              Reports
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
