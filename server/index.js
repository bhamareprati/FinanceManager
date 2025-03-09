
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./DB/Database.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js"


// ✅ Load Environment Variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// ✅ Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// ✅ API Routes
app.use("/api/users", userRoutes); //  ✅ User authentication routes
app.use("/api/expenses", expenseRoutes); // ✅ Expense management routes
// app.put("/api/expenses/:id",transactionRoutes);
app.put("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const updatedExpense = req.body;

  try {
    const expense = await ExpenseModel.findByIdAndUpdate(id, updatedExpense, { new: true });
    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// ✅ 404 Not Found Middleware
app.use((req, res) => {
  res.status(404).json({ success: false, message: "API route not found" });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.delete("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
