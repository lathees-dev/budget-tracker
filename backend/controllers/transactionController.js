const Transaction = require("../models/transactionModel");

const addTransaction = async (req, res) => {
  const { title, amount, type, category, date } = req.body;
  if (!title || !amount || !type || !category) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const transaction = await Transaction.create({
    user: req.user._id,
    title,
    amount,
    type,
    category,
    date,
  });
  res.status(201).json(transaction);
};

const getTransactions = async (req, res) => {
  try {
    const query = req.query.search || "";
    const transactions = await Transaction.find({
      user: req.user._id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};
const getTransactionById = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }
  res.json(transaction);
};

const updateTransaction = async (req, res) => {
  const { title, amount, type, category, date } = req.body;
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }
  transaction.title = title || transaction.title;
  transaction.amount = amount || transaction.amount;
  transaction.type = type || transaction.type;
  transaction.category = category || transaction.category;
  transaction.date = date || transaction.date;

  await transaction.save();
  res.json(transaction);
};

const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  console.log("Request Params:", req.params);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  if (transaction.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await Transaction.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Transaction deleted successfully" });
};

const getSpendingSummary = async (req, res) => {
  try {
    const thisWeek = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const lastWeek = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          date: {
            $gte: new Date(new Date() - 14 * 24 * 60 * 60 * 1000),
            $lt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      thisWeek: thisWeek[0]?.total || 0,
      lastWeek: lastWeek[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching spending summary" });
  }
};

const getExpenditureChart = async (req, res) => {
  try {
    const chartData = await Transaction.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    const labels = chartData.map((item) => item._id);
    const data = chartData.map((item) => item.total);

    res.json({ labels, data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching chart data" });
  }
};

const getRecentExpenses = async (req, res) => {
  try {
    const expenses = await Transaction.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(5);

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent expenses" });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSpendingSummary,
  getExpenditureChart,
  getRecentExpenses,
};
