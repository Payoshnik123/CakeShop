import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      textAlign: "center",
      padding: "50px"
    }}>
      <h1 style={{ color: "green" }}>🎉 Payment Successful!</h1>

      <p>Your order has been placed successfully.</p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/orders")}
          style={{ marginRight: "10px" }}
        >
          View Orders 📦
        </button>

        <button onClick={() => navigate("/")}>
          Continue Shopping 🛍️
        </button>
      </div>
    </div>
  );
};

export default Success;