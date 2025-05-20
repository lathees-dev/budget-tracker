// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/categoryController");

router.post("/", protect, addCategory);
router.get("/", protect, getCategories);
router.delete("/:id", protect, deleteCategory);

module.exports = router;
