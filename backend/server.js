const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/transactions", transactionRoutes);
// app.use("/api/budget", budgetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on the port ${PORT}`));
