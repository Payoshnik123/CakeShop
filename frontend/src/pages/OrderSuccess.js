import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Your cake is on the way 🍰</p>

      <button onClick={() => navigate("/")}>
        Go to Home
      </button>

      <button onClick={() => navigate("/orders")} style={{ marginLeft: "10px" }}>
        View Orders
      </button>
    </div>
  );
};

export default OrderSuccess;