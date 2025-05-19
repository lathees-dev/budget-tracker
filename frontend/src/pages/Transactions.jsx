import { useState, useEffect } from "react";
import FilterBar from "../Components/transactions/Filterbar";
import TransactionTable from "../Components/transactions/TransactionTable";
import API from "../utils/api";
import Cookies from "js-cookie";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const token = Cookies.get("jwt");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await API.get("/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <FilterBar setTransactions={setTransactions} />
      </div>
      <TransactionTable data={transactions} setTransactions={setTransactions} />
    </div>
  );
};

export default Transactions;
