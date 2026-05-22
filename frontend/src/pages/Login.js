import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (!email || !password) {
      alert("Please fill all fields ❌");
      return;
    }

    // ✅ Save login
    localStorage.setItem("userEmail", email);

    alert("Login Successful 🎉");

    navigate("/");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Login 🍰</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button style={button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

/* 🎨 Styles */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#fff5f7",
};

const card = {
  width: "350px",
  padding: "30px",
  borderRadius: "15px",
  background: "white",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
};

const button = {
  marginTop: "20px",
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "#ec4899",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

export default Login;