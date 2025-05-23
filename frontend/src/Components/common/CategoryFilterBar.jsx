import API from "../../utils/api";
import Cookies from "js-cookie";

const CategoryFilterBar = ({ setCategories }) => {
  const handleFilter = async (e) => {
    const query = e.target.value.toLowerCase();
    try {
      const token = Cookies.get("jwt");
      const response = await API.get(`/categories?search=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error filtering categories:", error);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search by category name or budget..."
      className="w-full border border-gray-600 bg-gray-700 text-white px-4 py-2 rounded shadow-sm mb-4"
      onChange={handleFilter}
    />
  );
};

export default CategoryFilterBar;
