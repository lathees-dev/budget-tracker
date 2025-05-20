import { useState, useEffect } from "react";
import SpendingSummary from "../Components/dashboard/SpendingSummary";
import ExpenditureChart from "../Components/dashboard/ExpenditureChart";
import RecentExpenses from "../Components/dashboard/RecentExpenses";
import API from "../utils/api";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalBudget: 0,
    totalExpenses: 0,
    balance: 0,
  });

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const token = Cookies.get("jwt");
        const response = await API.get("/dashboard/summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };

    fetchDashboardSummary();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-700 p-4 rounded">
          <h2 className="text-xl font-bold">Total Budget</h2>
          <p>₹{summary.totalBudget}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <h2 className="text-xl font-bold">Total Expenses</h2>
          <p>₹{summary.totalExpenses}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <h2 className="text-xl font-bold">Balance</h2>
          <p>₹{summary.balance}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SpendingSummary summary={summary} />
        <ExpenditureChart />
      </div>
      <RecentExpenses />
    </div>
  );
};

export default Dashboard;
