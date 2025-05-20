// controllers/dashboardController.js
const Transaction = require("../models/transactionModel");
const Category = require("../models/Category");

const getDashboardSummary = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    const transactions = await Transaction.find({
      user: req.user._id,
    }).populate("category");

    const totalBudget = categories.reduce(
      (sum, category) => sum + category.budget,
      0
    );
    const totalExpenses = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    const balance = totalBudget - totalExpenses;

    res.json({
      totalBudget,
      totalExpenses,
      balance,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard summary" });
  }
};

module.exports = {
  getDashboardSummary,
};
