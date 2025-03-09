
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import { HouseDoor, ListCheck, BarChart as BarChartIcon } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import moment from "moment";

// ✅ Define distinct colors for Pie Chart categories
const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#B3B3B3", "#F7464A"];

const Report = () => {
  const [chartType, setChartType] = useState("bar");
  const [timeFilter, setTimeFilter] = useState("weekly");
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses"); // Update with your API
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // ✅ Ensure Weeks Start from Sunday & Months from January
  const generateDateKeys = () => {
    let keys = [];

    if (timeFilter === "weekly") {
      // ✅ Generate week starting from Sunday
      for (let i = 0; i < 7; i++) {
        keys.push(moment().day(i).format("ddd")); // Ensures Sunday is first
      }
    } else if (timeFilter === "monthly") {
      let daysInMonth = moment().daysInMonth();
      for (let i = 1; i <= daysInMonth; i++) {
        keys.push(i.toString()); // 1, 2, 3, ..., 30
      }
    } else if (timeFilter === "yearly") {
      // ✅ Ensure months always start from January
      keys = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    }

    return keys;
  };

  // ✅ Process transactions and fill missing data (Line & Bar Chart)
  const formatData = (data) => {
    let groupedData = {};
    let allKeys = generateDateKeys();

    data.forEach(({ date, amount, type }) => {
      let key = moment(date).format(
        timeFilter === "weekly" ? "ddd" : timeFilter === "monthly" ? "D" : "MMM"
      );

      if (!groupedData[key]) {
        groupedData[key] = { name: key, income: 0, expense: 0 };
      }
      groupedData[key][type.toLowerCase()] += amount;
    });

    // ✅ Ensure all keys have at least 0 values
    allKeys.forEach((key) => {
      if (!groupedData[key]) {
        groupedData[key] = { name: key, income: 0, expense: 0 };
      }
    });

    return Object.values(groupedData);
  };

  // ✅ Process transactions for Pie Chart (Category-wise Expenses)
  const formatPieData = () => {
    let categoryWiseExpenses = {};

    transactions.forEach(({ category, amount, type }) => {
      if (type.toLowerCase() === "expense") {
        categoryWiseExpenses[category] = (categoryWiseExpenses[category] || 0) + amount;
      }
    });

    if (Object.keys(categoryWiseExpenses).length === 0) {
      return [];
    }

    return Object.entries(categoryWiseExpenses).map(([category, amount], index) => ({
      name: category,
      value: amount,
      fill: COLORS[index % COLORS.length], // ✅ Assign colors dynamically
    }));
  };

  const filteredData = formatData(transactions);
  const pieData = formatPieData();

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="bg-light shadow p-3">
        <Container>
          <Navbar.Brand className="fw-bold text-black">Personal Finance Manager</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link onClick={() => navigate("/home")}>
                <HouseDoor className="me-2" /> Home
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/transaction")}>
                <ListCheck className="me-2" /> Transactions
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/reports")}>
                <BarChartIcon className="me-2" /> Reports
              </Nav.Link>
            </Nav>
            {/* <Button variant="danger" className="ms-3 d-flex align-items-center">
              <FaSignOutAlt className="me-2" /> Logout
            </Button> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-4">
        <h2 className="text-center">Financial Reports</h2>

        {/* Chart Filters */}
        <div className="d-flex justify-content-center flex-wrap gap-3 mt-3">
          <div>
            <label htmlFor="chartType" className="fw-bold">Select Chart Type:</label>
            <select id="chartType" className="form-select" value={chartType} onChange={(e) => setChartType(e.target.value)}>
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
          </div>

          <div>
            <label htmlFor="timeFilter" className="fw-bold">Filter By:</label>
            <select id="timeFilter" className="form-select" value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        {/* Chart Display */}
        <div className="mt-4 d-flex justify-content-center">
          {filteredData.length === 0 ? (
            <p className="text-center text-danger fw-bold">No data available</p>
          ) : (
            <>
              {chartType === "bar" && (
                <ResponsiveContainer width="80%" height={300}>
                  <BarChart data={filteredData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#48A6A7" />
                    <Bar dataKey="expense" fill="#E50046" />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {chartType === "line" && (
                <ResponsiveContainer width="80%" height={300}>
                  <LineChart data={filteredData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#48A6A7" />
                    <Line type="monotone" dataKey="expense" stroke="#E50046" />
                  </LineChart>
                </ResponsiveContainer>
              )}

              {chartType === "pie" && pieData.length > 0 && (
                <ResponsiveContainer width="50%" height={300}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label />
                    <Tooltip formatter={(value, name) => [`Rs. ${value}`, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Report;
