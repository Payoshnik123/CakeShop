import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        // ✅ FIXED ROUTE
        const res = await fetch(
          `http://localhost:5000/orders/user/${userEmail}`
        );

        const data = await res.json();

        console.log("Orders 👉", data);

        setOrders(data);

      } catch (err) {
        console.log(err);
      }
    };

    if (userEmail) {
      loadOrders();
    }
  }, [userEmail]);

  return (
    <div className="order-container">
      <h2>My Orders 📦</h2>

      {orders.length === 0 ? (
        <p>No orders yet 😢</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="order-card"
            onClick={() => navigate(`/order/${order._id}`)}
            style={{ cursor: "pointer" }}
          >
            <p>
              <strong>Order ID:</strong> {order.orderId}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            {/* ✅ STATUS */}
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: getStatusColor(order.status),
                  fontWeight: "bold",
                }}
              >
                {order.status || "Pending"}
              </span>
            </p>

            {/* ✅ ITEMS */}
            <div className="order-items">
              {order.items?.length > 0 ? (
                order.items.map((item, i) => (
                  <div key={i} className="order-item">
                    <img
                      src={`http://localhost:5000${item.img}`}
                      width="60"
                      height="60"
                      alt={item.name}
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />

                    <span>{item.name}</span>

                    <span>{item.price}</span>
                  </div>
                ))
              ) : (
                <p>No items</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

/* 🎨 STATUS COLORS */
const getStatusColor = (status) => {
  if (status === "Pending") return "orange";
  if (status === "Confirmed") return "blue";
  if (status === "Delivered") return "green";
  if (status === "Cancelled") return "red";

  return "black";
};

export default OrderHistory;