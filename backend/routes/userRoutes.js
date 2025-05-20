const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const { getMe } = require("../controllers/userController");
const { updateProfile } = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");


router.get("/me", protect, getMe);
router.put("/update-profile", protect, updateProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;
