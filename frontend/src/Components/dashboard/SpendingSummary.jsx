import { useState, useEffect } from "react";
import API from "../../utils/api";
import Cookies from "js-cookie";

const SpendingSummary = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = Cookies.get("jwt");
        const response = await API.get("/transactions/summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching spending summary:", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-4 self-start w-full">
      <h2 className="text-xl font-bold mb-4">Spending Summary</h2>
      <div className="flex justify-between">
        <div>
          <p className="text-gray-400">This Week</p>
          <p className="text-2xl font-bold">₹{summary.thisWeek || 0}</p>
        </div>
        <div>
          <p className="text-gray-400">Last Week</p>
          <p className="text-2xl font-bold">₹{summary.lastWeek || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default SpendingSummary;
