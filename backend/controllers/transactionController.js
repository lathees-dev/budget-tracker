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
    const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
    res.json(transactions);
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

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  if (transaction.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await Transaction.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Transaction deleted successfully" });
};
  

module.exports = {
    addTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    };
