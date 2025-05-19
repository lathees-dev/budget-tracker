const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSpendingSummary,
  getExpenditureChart,
  getRecentExpenses,
} = require("../controllers/transactionController");
const { protect } = require("../middleware/authMiddleware");

// Specific routes first
router.get("/summary", protect, getSpendingSummary);
router.get("/chart", protect, getExpenditureChart);
router.get("/recent", protect, getRecentExpenses);

// General routes later
router.route("/").post(protect, addTransaction).get(protect, getTransactions);
router
  .route("/:id")
  .get(protect, getTransactionById)
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

module.exports = router;
