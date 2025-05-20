const User = require("../models/UserModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

//@route POST /api/auth/register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, email, password: hashPassword });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

//@route POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

const getMe = async (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
};

const updateProfile = async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
};