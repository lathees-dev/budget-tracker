import { useState, useEffect } from "react";
import API from "../utils/api";
import Cookies from "js-cookie";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", budget: 0 });

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

  const handleAddCategory = async () => {
    try {
      const token = Cookies.get("jwt");
      await API.post(
        "/categories",
        { name: newCategory.name, budget: newCategory.budget },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewCategory({ name: "", budget: 0 });
      const response = await API.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error adding category:", error);
    }
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
      <div className="mb-4">
        <input
          type="text"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          placeholder="Category Name"
          className="border border-gray-600 bg-gray-700 text-white px-4 py-2 rounded shadow-sm"
        />
        <input
          type="number"
          value={newCategory.budget}
          onChange={(e) =>
            setNewCategory({
              ...newCategory,
              budget: parseFloat(e.target.value),
            })
          }
          placeholder="Budget"
          className="border border-gray-600 bg-gray-700 text-white px-4 py-2 rounded shadow-sm ml-2"
        />
        <button
          onClick={handleAddCategory}
          className="ml-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
        >
          Add Category
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
            <button
              onClick={() => handleDeleteCategory(category._id)}
              className="text-red-400 hover:text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
