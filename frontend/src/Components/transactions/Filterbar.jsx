import API from "../../utils/api";
import Cookies from "js-cookie";

const FilterBar = ({ setTransactions }) => {
  const handleFilter = async (e) => {
    const query = e.target.value.toLowerCase();
    try {
      const response = await API.get(`/transactions?search=${query}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      });

      // Log the response data for debugging
      console.log("Filtered transactions:", response.data);

      // Update the transactions state
      setTransactions(response.data);
    } catch (error) {
      console.error("Error filtering transactions:", error);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search by description or category..."
      className="w-full border border-gray-600 bg-gray-700 text-white px-4 py-2 rounded shadow-sm"
      onChange={handleFilter}
    />
  );
};

export default FilterBar;
