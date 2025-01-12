const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to the database. Current time:", res.rows[0]);
  }
});

// API Routes
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Home page WIP");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = pool;
