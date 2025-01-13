import React from "react";
import axios from "axios";

const Report = () => {
  const handleExportCSV = () => {
    axios({
      url: "http://localhost:5000/api/products/export/csv",
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "products_report.csv");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error exporting CSV", error);
      });
  };

  const handleExportExcel = () => {
    axios({
      url: "http://localhost:5000/api/products/export/excel",
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "products_report.xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error exporting Excel", error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Product Report
      </h1>
      <div className="flex justify-center gap-6 mt-6">
        <button
          onClick={handleExportCSV}
          className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Export CSV
        </button>
        <button
          onClick={handleExportExcel}
          className="bg-gray-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Export Excel
        </button>
      </div>
    </div>
  );
};

export default Report;
