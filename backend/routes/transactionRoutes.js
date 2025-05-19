const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addTransaction).get(protect, getTransactions);
router
  .route("/:id")
  .get(protect, getTransactionById)
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

module.exports = router;
