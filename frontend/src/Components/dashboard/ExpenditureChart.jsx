import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import API from "../../utils/api";
import Cookies from "js-cookie";

// Register the necessary components
ChartJS.register(ArcElement, Title, Tooltip, Legend);

const ExpenditureChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        
        const response = await API.get("/transactions/chart", {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        });
        setChartData({
          labels: response.data.labels,
          datasets: [
            {
              data: response.data.data,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">Expenditure</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default ExpenditureChart;
