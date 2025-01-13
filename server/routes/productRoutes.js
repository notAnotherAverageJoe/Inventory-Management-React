const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { Parser } = require("json2csv");
const xlsx = require("xlsx");

// Regular product routes
router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

// Route to export products as CSV
router.get("/export/csv", async (req, res) => {
  try {
    const products = await productController.getRawProducts();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    const sortedProducts = products.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const json2csv = new Parser();
    const csv = json2csv.parse(sortedProducts);

    res.header("Content-Type", "text/csv");
    res.attachment("products_report.csv");
    res.send(csv);
  } catch (err) {
    console.error("Error generating CSV report:", err.message);
    res.status(500).json({ message: "Error generating CSV report" });
  }
});

router.get("/export/excel", async (req, res) => {
  try {
    const products = await productController.getRawProducts();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    const sortedProducts = products.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const ws = xlsx.utils.json_to_sheet(sortedProducts);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Products");

    const excelFile = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    res.header(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.attachment("products_report.xlsx");

    res.send(excelFile);
  } catch (err) {
    console.error("Error generating Excel report:", err.message);
    res.status(500).json({ message: "Error generating Excel report" });
  }
});

module.exports = router;
