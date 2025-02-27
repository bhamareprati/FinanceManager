/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./style.css";

const TableView = ({ filters }) => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses", { params: filters });
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Date</th>
          <th>Title</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense._id}>
            <td>{new Date(expense.date).toLocaleDateString()}</td>
            <td>{expense.title}</td>
            <td>${expense.amount}</td>
            <td>{expense.type}</td>
            <td>{expense.category}</td>
            <td>
              <button className="btn btn-warning btn-sm mx-1" onClick={() => navigate(`/edit-expense/${expense._id}`)}>
                <FaEdit />
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(expense._id)}>
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
