import API from "../../utils/api";
import Cookies from "js-cookie";
import { FaEdit, FaTrash } from "react-icons/fa";

const TransactionTable = ({ data, setTransactions, openModal }) => {
  const handleDelete = async (id) => {
    const token = Cookies.get("jwt");
    try {
      await API.delete(`/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await API.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-700">
          <tr>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Amount</th>
            <th className="py-3 px-4 text-left">Type</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tx) => (
            <tr
              key={tx._id}
              className="border-b border-gray-700 hover:bg-gray-700"
            >
              <td className="py-3 px-4">{formatDate(tx.date)}</td>
              <td className="py-3 px-4">{tx.title}</td>
              <td className="py-3 px-4">₹{tx.amount}</td>
              <td className="py-3 px-4">{tx.type}</td>
              <td className="py-3 px-4">{tx.category.name}</td>
              <td className="py-3 px-4">
                <button
                  className="text-blue-400 hover:text-blue-500 mr-2"
                  onClick={() => openModal(tx)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-400 hover:text-red-500"
                  onClick={() => handleDelete(tx._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
