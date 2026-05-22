import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👉 Fetch orders
  const loadOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/orders");
      const data = await res.json();

      setOrders(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // 👉 Total Revenue
  const totalRevenue = orders.reduce((sum, order) => {
    const orderTotal =
      order.items?.reduce((s, item) => {
        return (
          s +
          parseInt(item.price?.replace("₹", "") || 0)
        );
      }, 0) || 0;

    return sum + orderTotal;
  }, 0);

  // 👉 SALES ANALYTICS DATA
  const chartData = {
    labels: orders.map(
      (_, index) => `Order ${index + 1}`
    ),

    datasets: [
      {
        label: "Order Revenue",

        data: orders.map((order) =>
          order.items?.reduce(
            (sum, item) =>
              sum +
              parseInt(
                item.price?.replace("₹", "") || 0
              ),
            0
          )
        ),

        backgroundColor: "#ec4899",
        borderRadius: 8,
      },
    ],
  };

  // 👉 TOP SELLING PRODUCTS
  const productSales = {};

  orders.forEach((order) => {
    order.items?.forEach((item) => {
      if (productSales[item.name]) {
        productSales[item.name] += 1;
      } else {
        productSales[item.name] = 1;
      }
    });
  });

  const topProductsData = {
    labels: Object.keys(productSales),

    datasets: [
      {
        label: "Top Selling Cakes",

        data: Object.values(productSales),

        backgroundColor: [
          "#ec4899",
          "#3b82f6",
          "#22c55e",
          "#f59e0b",
          "#8b5cf6",
          "#ef4444",
        ],
      },
    ],
  };

  // 👉 Delete Order
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(
        `http://localhost:5000/order/${id}`,
        {
          method: "DELETE",
        }
      );

      setOrders((prev) =>
        prev.filter((o) => o._id !== id)
      );

    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

  // 👉 Update Status
  const updateStatus = async (id, status) => {
    try {
      await fetch(
        `http://localhost:5000/update-status/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ status }),
        }
      );

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status } : o
        )
      );

    } catch (err) {
      console.log(err);
      alert("Status update failed ❌");
    }
  };

  // 👉 Status Color
  const getStatusColor = (status) => {
    if (status === "Pending") return "orange";

    if (status === "Confirmed") return "blue";

    if (status === "Delivered") return "green";

    if (status === "Cancelled") return "red";

    return "black";
  };

  // 👉 Loading
  if (loading) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        background: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          color: "#111827",
        }}
      >
        Admin Dashboard 🛠️
      </h1>

      {/* 📊 STATS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Orders</h3>

          <p style={statNumber}>
            {orders.length}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Total Revenue</h3>

          <p style={statNumber}>
            ₹{totalRevenue}
          </p>
        </div>
      </div>

      {/* 📈 BAR CHART */}
      <div style={chartContainer}>
        <h2 style={{ marginBottom: "20px" }}>
          Sales Analytics 📊
        </h2>

        <Bar data={chartData} />
      </div>

      {/* 🍰 PIE CHART */}
      <div
        style={{
          ...chartContainer,
          marginTop: "30px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          Top Selling Cakes 🍰
        </h2>

        <div
          style={{
            width: "400px",
            margin: "auto",
          }}
        >
          <Pie data={topProductsData} />
        </div>
      </div>

      {/* 📦 ORDERS */}
      <h2 style={{ marginTop: "40px" }}>
        All Orders
      </h2>

      {orders.length === 0 ? (
        <p>No orders found ❌</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={orderCard}
          >
            <p>
              <strong>Order ID:</strong>{" "}
              {order.orderId}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.userEmail}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                order.createdAt
              ).toLocaleString()}
            </p>

            {/* STATUS */}
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: getStatusColor(
                    order.status
                  ),

                  fontWeight: "bold",
                }}
              >
                {order.status || "Pending"}
              </span>
            </p>

            {/* STATUS BUTTONS */}
            <div style={{ marginBottom: "15px" }}>
              <button
                style={pendingBtn}
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Pending"
                  )
                }
              >
                Pending
              </button>

              <button
                style={confirmBtn}
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Confirmed"
                  )
                }
              >
                Confirm
              </button>

              <button
                style={deliverBtn}
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Delivered"
                  )
                }
              >
                Deliver
              </button>
            </div>

            {/* ITEMS */}
            <div>
              {order.items?.length > 0 ? (
                order.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      marginLeft: "10px",
                      marginBottom: "5px",
                    }}
                  >
                    • {item.name} -{" "}
                    {item.price}
                  </div>
                ))
              ) : (
                <p>No items</p>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ marginTop: "15px" }}>
              <button
                style={deleteBtn}
                onClick={() =>
                  handleDelete(order._id)
                }
              >
                Delete Order 🗑️
              </button>

              <button
                style={logoutBtn}
                onClick={() => {
                  localStorage.removeItem(
                    "isAdmin"
                  );

                  window.location.href =
                    "/admin-login";
                }}
              >
                Logout 🚪
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

/* 🎨 STYLES */

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "15px",
  width: "220px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const statNumber = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#ec4899",
};

const chartContainer = {
  background: "white",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const orderCard = {
  background: "white",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "15px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const pendingBtn = {
  background: "orange",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  marginRight: "10px",
  cursor: "pointer",
};

const confirmBtn = {
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  marginRight: "10px",
  cursor: "pointer",
};

const deliverBtn = {
  background: "#22c55e",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "10px",
};

const logoutBtn = {
  background: "#111827",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default AdminDashboard;