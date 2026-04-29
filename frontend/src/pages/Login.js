import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Save email
    localStorage.setItem("userEmail", email);

    alert("Login successful ✅");

    // Redirect to home
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "10px",
            width: "250px",
            marginBottom: "10px",
          }}
        />
        <br />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "pink",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;