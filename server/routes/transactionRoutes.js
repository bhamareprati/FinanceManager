import express from "express";
import mongoose from "mongoose";
import Expense from "../models/expenseSchema.js"; 

const router = express.Router();

router.put("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const updatedExpense = req.body;

  console.log("Updating expense with ID:", id);
  console.log("Received update data:", updatedExpense);


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Expense ID" });
  }

  try {
    const result = await Expense.findByIdAndUpdate(id, updatedExpense, { new: true });

    if (!result) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ error: "Failed to update expense" });
  }
});

export default router; 
