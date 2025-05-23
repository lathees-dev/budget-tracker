import { useState, useEffect } from "react";
import API from "../utils/api";
import Cookies from "js-cookie";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import CategoryModal from "../Components/common/CategoryModal";
import CategoryFilterBar from "../Components/common/CategoryFilterBar";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

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

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      const token = Cookies.get("jwt");
      await API.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await API.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>
      <div className="mb-4 flex flex-col">
        <CategoryFilterBar setCategories={setCategories} />
        <button
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
          className="ml-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded flex items-center self-end"
        >
          <FaPlus className="mr-2" /> Add Category
        </button>
      </div>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category._id}
            className="flex justify-between items-center bg-gray-700 p-2 rounded"
          >
            <span>
              {category.name} - Budget: ₹{category.budget}
            </span>
            <div>
              <button
                onClick={() => handleEditCategory(category)}
                className="text-blue-400 hover:text-blue-500 mr-2"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteCategory(category._id)}
                className="text-red-400 hover:text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={editingCategory}
        setCategories={setCategories}
      />
    </div>
  );
};

export default CategoryManagement;
