import API from "../../utils/api";
import Cookies from "js-cookie";
const TransactionTable = ({ data, setTransactions }) => {
  const token = Cookies.get("jwt");
  console.log("TransactionTable data:", data);
  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(data.filter((tx) => tx.id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
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
              key={tx.id}
              className="border-b border-gray-700 hover:bg-gray-700"
            >
              <td className="py-3 px-4">{tx.date}</td>
              <td className="py-3 px-4">{tx.title}</td>
              <td className="py-3 px-4">₹{tx.amount}</td>
              <td className="py-3 px-4">{tx.type}</td>
              <td className="py-3 px-4">{tx.category}</td>
              <td className="py-3 px-4">
                <button className="text-blue-400 hover:underline">Edit</button>
                <button
                  className="text-red-400 hover:underline ml-4"
                  onClick={() => handleDelete(tx._id)}
                >
                  Delete
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
