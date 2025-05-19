import { useState } from "react";
import SpendingSummary from "../Components/dashboard/SpendingSummary";
import ExpenditureChart from "../Components/dashboard/ExpenditureChart";
import RecentExpenses from "../Components/dashboard/RecentExpenses";
import TransactionForm from "../Components/transactions/TransactionForm";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <SpendingSummary />
        <ExpenditureChart />
      </div>
      <RecentExpenses />
      <TransactionForm setTransactions={setTransactions} />
    </div>
  );
};

export default Dashboard;
