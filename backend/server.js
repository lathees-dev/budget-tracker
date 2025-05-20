const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// const allowedOrigin = "https://budget-tracker-eight-iota.vercel.app/";

app.use(
  cors({
    origin: "https://budget-tracker-eight-iota.vercel.app",
    allowedHeaders: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use("/api/auth", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/dashboard", dashboardRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on the port ${PORT}`));
