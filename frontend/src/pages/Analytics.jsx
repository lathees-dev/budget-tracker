import { useState, useEffect } from "react";
import API from "../utils/api";
import Cookies from "js-cookie";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

// Register the necessary components for ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Analytics = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("jwt");
        const transactionsResponse = await API.get("/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const categoriesResponse = await API.get("/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(transactionsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Process data for category-wise spending
  const categorySpending = categories.map((category) => {
    const spending = transactions
      .filter((tx) => tx.category === category._id)
      .reduce((sum, tx) => sum + tx.amount, 0);
    return { name: category.name, spending, budget: category.budget };
  });

  // Process data for monthly spending trends
  const monthlySpending = transactions.reduce((acc, tx) => {
    const month = new Date(tx.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += tx.amount;
    return acc;
  }, {});

  // Process data for top expenses
  const topExpenses = [...transactions]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  // Process data for savings rate
  const savingsRate = transactions.reduce((acc, tx) => {
    const month = new Date(tx.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    if (!acc[month]) {
      acc[month] = { income: 0, expenses: 0 };
    }
    if (tx.type === "Credit") {
      acc[month].income += tx.amount;
    } else {
      acc[month].expenses += tx.amount;
    }
    return acc;
  }, {});

  // Chart data
  const spendingData = {
    labels: categorySpending.map((cs) => cs.name),
    datasets: [
      {
        label: "Spending by Category",
        data: categorySpending.map((cs) => cs.spending),
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
  };

  const monthlySpendingData = {
    labels: Object.keys(monthlySpending),
    datasets: [
      {
        label: "Monthly Spending",
        data: Object.values(monthlySpending),
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  const budgetVsSpendingData = {
    labels: categorySpending.map((cs) => cs.name),
    datasets: [
      {
        label: "Budget",
        data: categorySpending.map((cs) => cs.budget),
        backgroundColor: "#4BC0C0",
      },
      {
        label: "Actual Spending",
        data: categorySpending.map((cs) => cs.spending),
        backgroundColor: "#FF6384",
      },
    ],
  };

  const savingsRateData = {
    labels: Object.keys(savingsRate),
    datasets: [
      {
        label: "Savings Rate",
        data: Object.keys(savingsRate).map(
          (month) =>
            ((savingsRate[month].income - savingsRate[month].expenses) /
              savingsRate[month].income) *
            100
        ),
        borderColor: "#FFCE56",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        fill: true,
      },
    ],
  };

  const incomeVsExpensesData = {
    labels: Object.keys(savingsRate),
    datasets: [
      {
        label: "Income",
        data: Object.keys(savingsRate).map(
          (month) => savingsRate[month].income
        ),
        backgroundColor: "#36A2EB",
      },
      {
        label: "Expenses",
        data: Object.keys(savingsRate).map(
          (month) => savingsRate[month].expenses
        ),
        backgroundColor: "#FF6384",
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Spending by Category</h2>
          <Pie data={spendingData} />
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Monthly Spending Trends</h2>
          <Line data={monthlySpendingData} />
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Budget vs. Actual Spending</h2>
          <Bar data={budgetVsSpendingData} />
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Savings Rate</h2>
          <Line data={savingsRateData} />
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Income vs. Expenses</h2>
          <Bar data={incomeVsExpensesData} />
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Top Expenses</h2>
          <ul>
            {topExpenses.map((expense, index) => (
              <li key={index} className="mb-2">
                {expense.title}: ₹{expense.amount}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
