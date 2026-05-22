import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // 👉 simple check (can upgrade later)
    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin-dashboard");
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Admin Login 🔐</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default AdminLogin;