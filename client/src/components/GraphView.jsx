// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardBody, CardTitle } from "reactstrap";
// import "./style.css";

// // Import images
// import incomeImg from "../assets/income.jpg";
// import expenseImg from "../assets/expenditure.png";
// import balanceImg from "../assets/total.png";

// const GraphView = ({ filters }) => {
//   const [summary, setSummary] = useState({
//     totalIncome: 0,
//     totalExpense: 0,
//     balance: 0,
//   });

//   useEffect(() => {
//     fetchSummary();
//   }, [filters]);  // ✅ Update whenever filters change

//   // ✅ Fetch Real-Time Summary from Transactions
//   const fetchSummary = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/expenses", { params: filters });

//       if (response.data) {
//         let totalIncome = 0;
//         let totalExpense = 0;

//         response.data.forEach(transaction => {
//           if (transaction.type.toLowerCase() === "income") {
//             totalIncome += transaction.amount;
//           } else if (transaction.type.toLowerCase() === "expense") {
//             totalExpense += transaction.amount;
//           }
//         });

//         setSummary({
//           totalIncome,
//           totalExpense,
//           balance: totalIncome - totalExpense,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching summary:", error);
//     }
//   };

//   return (
//     <div className="container text-center">
//       {/* Summary Cards */}
//       <div className="row">
//         <div className="col-md-4">
//           <Card className="shadow-sm bg-success text-white">
//             <img src={incomeImg} className="card-img-top" alt="Total Income" />
//             <CardBody>
//               <CardTitle tag="h5">Total Income</CardTitle>
//               <h3>Rs.{summary.totalIncome}</h3>
//             </CardBody>
//           </Card>
//         </div>
//         <div className="col-md-4">
//           <Card className="shadow-sm bg-danger text-white">
//             <img src={expenseImg} className="card-img-top" alt="Expense" />
//             <CardBody>
//               <CardTitle tag="h5">Total Expense</CardTitle>
//               <h3>Rs.{summary.totalExpense}</h3>
//             </CardBody>
//           </Card>
//         </div>
//         <div className="col-md-4">
//           <Card className="shadow-sm bg-primary text-white">
//             <img src={balanceImg} className="card-img-top" alt="Balance" />
//             <CardBody>
//               <CardTitle tag="h5">Balance</CardTitle>
//               <h3>Rs.{summary.balance}</h3>
//             </CardBody>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GraphView;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./style.css";

// Import images
import incomeImg from "../assets/income.jpg";
import expenseImg from "../assets/expenditure.png";
import balanceImg from "../assets/total.png";

const GraphView = ({ filters, refreshTrigger }) => {  // ✅ Accept refreshTrigger prop
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  useEffect(() => {
    fetchSummary();
  }, [filters, refreshTrigger]);  // ✅ Fetch summary whenever refreshTrigger changes

  // ✅ Fetch Real-Time Summary from Transactions
  const fetchSummary = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses", { params: filters });

      if (response.data) {
        let totalIncome = 0;
        let totalExpense = 0;

        response.data.forEach(transaction => {
          if (transaction.type.toLowerCase() === "income") {
            totalIncome += transaction.amount;
          } else if (transaction.type.toLowerCase() === "expense") {
            totalExpense += transaction.amount;
          }
        });

        setSummary({
          totalIncome,
          totalExpense,
          balance: totalIncome - totalExpense,
        });
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  return (
    <div className="container text-center">
      {/* Summary Cards */}
      <div className="row">
        <div className="col-md-4">
          <Card className="shadow-sm bg-success text-white">
            <img src={incomeImg} className="card-img-top" alt="Total Income" />
            <CardBody>
              <CardTitle tag="h5">Total Income</CardTitle>
              <h3>Rs.{summary.totalIncome}</h3>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="shadow-sm bg-danger text-white">
            <img src={expenseImg} className="card-img-top" alt="Expense" />
            <CardBody>
              <CardTitle tag="h5">Total Expense</CardTitle>
              <h3>Rs.{summary.totalExpense}</h3>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="shadow-sm bg-primary text-white">
            <img src={balanceImg} className="card-img-top" alt="Balance" />
            <CardBody>
              <CardTitle tag="h5">Balance</CardTitle>
              <h3>Rs.{summary.balance}</h3>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GraphView;
