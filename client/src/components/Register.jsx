
// import React, { useState } from "react";
// import { Container, Form, Button, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./style.css";
// import { registerUser } from "../services/api";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await registerUser(formData);
//       navigate("/login");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center text-primary">Register</h2>
//       {error && <Alert variant="danger">{error}</Alert>}
//       <Form onSubmit={handleRegister} className="p-4 shadow rounded bg-light">
//         <Form.Group className="mb-3">
//           <Form.Label>Name</Form.Label>
//           <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Email</Form.Label>
//           <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
//         </Form.Group>
//         <Button variant="primary" type="submit">Register</Button>
//       </Form>
//       <p className="mt-3 text-center">
//          Already have an account? <a href="/login" className="text-primary">Login</a>
//        </p>
//     </Container>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { registerUser } from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container style={styles.container}>
      <style>
        {`
          .custom-form {
            background: linear-gradient(to right,rgb(132, 120, 120),rgb(95, 102, 95));
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .custom-form h2 {
            font-weight: bold;
            color: #004085;
          }

          .custom-btn {
            width: 100%;
            font-size: 18px;
            padding: 10px;
          }

          .custom-link {
            text-decoration: none;
            color: #004085;
            font-weight: bold;
          }

          .custom-link:hover {
            color: #002752;
            text-decoration: underline;
          }
        `}
      </style>

      <h2 className="text-center">Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleRegister} className="custom-form">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required
            style={styles.input}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required
            style={styles.input}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required
            style={styles.input}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="custom-btn">Register</Button>
      </Form>

      <p className="mt-3 text-center">
        Already have an account? <a href="/login" className="custom-link">Login</a>
      </p>
    </Container>
  );
};

// ✅ Inline Styles
const styles = {
  container: {
    marginTop: "50px",
    maxWidth: "400px",
    background: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
  },
};

export default Register;
