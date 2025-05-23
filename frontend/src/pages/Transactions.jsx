import { useState, useEffect } from "react";
import FilterBar from "../Components/transactions/Filterbar";
import TransactionTable from "../Components/transactions/TransactionTable";
import TransactionModal from "../Components/transactions/TransactionModal";
import API from "../utils/api";
import Cookies from "js-cookie";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
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

  const openModal = (transaction = null) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col">
        <FilterBar setTransactions={setTransactions} />
        <button
          onClick={() => openModal()}
          className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded self-end mb-2 cursor-pointer mt-4"
        >
          Add Transaction
        </button>
      </div>
      <TransactionTable
        data={transactions}
        setTransactions={setTransactions}
        openModal={openModal}
      />
      <TransactionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        transaction={editingTransaction}
        setTransactions={setTransactions}
      />
    </div>
  );
};

export default Transactions;
