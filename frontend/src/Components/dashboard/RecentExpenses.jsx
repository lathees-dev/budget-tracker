import { useState, useEffect } from "react";
import API from "../../utils/api";
import Cookies from "js-cookie";

const RecentExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = Cookies.get("jwt");
        const response = await API.get("/transactions/recent", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching recent expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="mb-2">
            <div className="flex justify-between">
              <span>{expense.title}</span>
              <span>₹{expense.amount}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentExpenses;
