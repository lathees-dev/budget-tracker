import { useState, useEffect } from "react";
import API from "../../utils/api";
import Cookies from "js-cookie";

const TransactionModal = ({
  isOpen,
  onClose,
  transaction,
  setTransactions,
}) => {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    amount: "",
    type: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = Cookies.get("jwt");
        const response = await API.get("/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (transaction) {
        const formattedDate = new Date(transaction.date)
          .toISOString()
          .split("T")[0];
        setFormData({
          date: formattedDate,
          title: transaction.title,
          amount: transaction.amount,
          type: transaction.type,
          category: transaction.category._id,
        });
      } else {
        setFormData({
          date: "",
          title: "",
          amount: "",
          type: "",
          category: "",
        });
      }
    }
  }, [isOpen, transaction]); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("jwt");
    try {
      if (transaction) {
        await API.put(`/transactions/${transaction._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await API.post("/transactions", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      const response = await API.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data);
      onClose();
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/2 max-w-1/2">
        <h2 className="text-xl font-bold mb-4">
          {transaction ? "Edit Transaction" : "Add Transaction"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Amount</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            >
              <option value="">Select Type</option>
              <option value="Credit">Income (Credit)</option>
              <option value="Debit">Expense (Debit)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded"
            >
              {transaction ? "Update Transaction" : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
