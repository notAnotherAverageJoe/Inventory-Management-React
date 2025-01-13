import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Report = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch inventory data from the backend
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setInventoryData(response.data);
        prepareChartData(response.data);
      })
      .catch((error) => console.error("Error fetching inventory data", error));
  }, []);

  const prepareChartData = (data) => {
    const labels = data.map((product) => product.name);
    const quantities = data.map((product) => product.quantity);

    setChartData({
      labels,
      datasets: [
        {
          label: "Inventory Status",
          data: quantities,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

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

      {/* Bar Chart */}
      <div className="mb-8">
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Current Inventory Status",
                },
                legend: {
                  display: false,
                },
              },
            }}
          />
        ) : (
          <p className="text-center text-gray-600">Loading chart...</p>
        )}
      </div>

      <div className="flex justify-center gap-6 mt-6">
        <button
          onClick={handleExportCSV}
          className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Export CSV
        </button>
        {/* <button
          onClick={handleExportExcel}
          className="bg-green-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Export Excel
        </button> */}
      </div>
    </div>
  );
};

export default Report;
