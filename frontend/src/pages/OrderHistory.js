import React, { useEffect, useState } from "react";
import "./OrderHistory.css";
import { useNavigate } from "react-router-dom";



const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      alert("Please login first");
      return;
    }

    fetch(`http://localhost:5000/orders/${userEmail}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="order-container">
      <h2>My Orders 📦</h2>

      {orders.length === 0 ? (
        <p>No orders found 😢</p>
      ) : (
        orders.map((order, index) => (
          <div
              key={index}
              className="order-card"
              onClick={() => navigate(`/order/${order._id}`)}
              style={{ cursor: "pointer" }}
            >
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p><strong>Payment ID:</strong> {order.paymentId}</p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="order-items">
              {order.items.map((item, i) => (
                <div key={i} className="order-item">
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;