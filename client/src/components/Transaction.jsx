 import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Nav, Container, Button, Table, ButtonGroup } from "react-bootstrap";
import { FaEdit, FaTrash, FaSignOutAlt } from "react-icons/fa";
import { HouseDoor, ListCheck, BarChart } from "react-bootstrap-icons"; 
import { useNavigate } from "react-router-dom";
import { getExpenses, deleteExpense, updateExpense as updatedExpense } from "../services/api";
import EditFormModel from "./EditFormModel";
import Report from "./Report"; // ✅ Import the correct component

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filterType, setFilterType] = useState("All"); // Default: Show all transactions

  // Fetch transactions when component mounts
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Fetch transactions for the logged-in user
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Fetch token
      const response = await axios.get("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Attach token
      });

      console.log("📌 Transactions Fetched:", response.data);
      setTransactions(response.data);
      setFilteredTransactions(response.data);
    } catch (error) {
      console.error("❌ Error fetching transactions:", error);
      setTransactions([]);
      setFilteredTransactions([]);
    }
  };

  // Filter transactions by type (All, Income, Expense)
  const handleFilterChange = (type) => {
    setFilterType(type);
    if (type === "All") {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(
        transactions.filter((t) => t.type.toLowerCase() === type.toLowerCase())
      );
    }
  };

  // Delete a transaction
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTransactions(); // ✅ Refresh transactions after deletion
    } catch (error) {
      console.error("❌ Failed to delete transaction:", error);
    }
  };

  // Handle transaction edit
  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  // Handle transaction update
  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!selectedTransaction || !selectedTransaction._id) {
      console.error("❌ Invalid expense ID:", selectedTransaction);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await updatedExpense(selectedTransaction._id, selectedTransaction, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.error) {
        setTransactions((prevTransactions) =>
          prevTransactions.map((t) =>
            t._id === selectedTransaction._id ? response : t
          )
        );
        setFilteredTransactions((prevFiltered) =>
          prevFiltered.map((t) =>
            t._id === selectedTransaction._id ? response : t
          )
        );
        setShowModal(false);
      } else {
        console.error("❌ Error updating transaction:", response.error);
      }
    } catch (error) {
      console.error("❌ Error updating transaction:", error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="bg-light shadow p-3">
        <Container>
          <Navbar.Brand className="fw-bold text-black">Personal Finance Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav className="custom-nav">
              <Nav.Link onClick={() => navigate("/home")}>
                <HouseDoor className="me-2" /> Home
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/transaction")}>
                <ListCheck className="me-2" /> Transactions
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/reports")}>
                <BarChart className="me-2" /> Reports
              </Nav.Link>
            </Nav>
            {/* <Button variant="danger" className="ms-3 d-flex align-items-center">
              <FaSignOutAlt className="me-2" /> Logout
            </Button> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <p className="finance-quote">"Money grows when you manage it well."</p>

      {/* Transactions Section */}
      <Container className="mt-4">
        <h2 className="text-center mb-3">Transactions</h2>

        {/* Filter Buttons */}
        <ButtonGroup className="d-flex justify-content-center mb-3">
          <Button
            variant={filterType === "All" ? "primary" : "light"}
            onClick={() => handleFilterChange("All")}
          >
            All
          </Button>
          <Button
            variant={filterType === "Income" ? "success" : "light"}
            onClick={() => handleFilterChange("Income")}
          >
            Income
          </Button>
          <Button
            variant={filterType === "Expense" ? "danger" : "light"}
            onClick={() => handleFilterChange("Expense")}
          >
            Expense
          </Button>
        </ButtonGroup>

        {/* Transactions Table */}
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount (Rs.)</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.title}</td>
                  <td>Rs.{transaction.amount}</td>
                  <td className={transaction.type === "Income" ? "text-success" : "text-danger"}>
                    {transaction.type}
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.description}</td>
                  <td>
                    <Button className="btn btn-warning btn-sm mx-1" onClick={() => handleEdit(transaction)}>
                      <FaEdit />
                    </Button>
                    <Button className="btn btn-danger btn-sm" onClick={() => handleDelete(transaction._id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Edit Transaction Modal */}
        {showModal && (
          <EditFormModel
            showModal={showModal}
            selectedTransaction={selectedTransaction}
            setSelectedTransaction={setSelectedTransaction}
            handleUpdate={handleUpdate}
            setShowModal={setShowModal}
          />
        )}
      </Container>
    </>
  );
};

export default Transactions;
