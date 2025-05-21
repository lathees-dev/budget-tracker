// controllers/categoryController.js
const Category = require("../models/Category");

const addCategory = async (req, res) => {
  const { name, budget } = req.body;
  try {
    const category = await Category.create({
      user: req.user._id,
      name,
      budget,
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: "Error adding category" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};

const updateCategory = async (req, res) => {
  const { name, budget } = req.body;
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.name = name || category.name;
    category.budget = budget || category.budget;
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error updating category" });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category" });
  }
};

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
