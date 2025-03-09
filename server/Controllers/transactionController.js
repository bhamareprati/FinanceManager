import Expense from "../models/expenseSchema.js";
import mongoose from "mongoose";

export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid expense ID" });
        }

        const updatedExpense = await Expense.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedExpense) {
            return res.status(404).json({ error: "Expense not found" });
        }

        res.status(200).json({ message: "Expense updated successfully", updatedExpense });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
