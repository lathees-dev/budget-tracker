import { useState } from "react";
import API from "../../utils/api";
import Cookies from "js-cookie";

const TransactionForm = ({ transaction, setTransactions }) => {
  const [formData, setFormData] = useState(
    transaction || {
      date: "",
      title: "",
      amount: "",
      type: "",
      category: "",
    }
  );

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
      const response = await API.get("/transactions");
      setTransactions(response.data);
      setFormData({
        date: "",
        title: "",
        amount: "",
        type: "",
        category: "",
      });
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Amount</label>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
        >
          <option value="">Select Type</option>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Category</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-purple-500 hover:bg-purple-600 text-white p-2 rounded"
      >
        {transaction ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
