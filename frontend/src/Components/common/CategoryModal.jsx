import { useState, useEffect } from "react";
import API from "../../utils/api";
import Cookies from "js-cookie";

const CategoryModal = ({ isOpen, onClose, category, setCategories }) => {
  const [formData, setFormData] = useState({
    name: "",
    budget: "", // Changed from 0 to empty string
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        budget: category.budget,
      });
    } else {
      setFormData({
        name: "",
        budget: "", // Changed from 0 to empty string
      });
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("jwt");

    // Ensure budget is properly converted to number before submitting
    const dataToSubmit = {
      ...formData,
      budget: formData.budget === "" ? 0 : parseFloat(formData.budget),
    };

    try {
      if (category) {
        await API.put(`/categories/${category._id}`, dataToSubmit, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await API.post("/categories", dataToSubmit, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      const response = await API.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
      onClose();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-1/2">
        <h2 className="text-xl font-bold mb-4">
          {category ? "Edit Category" : "Add Category"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Category Name</label>
            <input
              type="text"
              value={formData.name}
              placeholder="Enter category name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Budget</label>
            <input
              type="number"
              value={formData.budget}
              placeholder="Enter budget"
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
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
              {category ? "Update Category" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
