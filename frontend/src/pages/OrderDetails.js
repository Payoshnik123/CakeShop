import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      const res = await fetch("http://localhost:5000/orders");
      const data = await res.json();

      const found = data.find((o) => o._id === id);
      setOrder(found);
    };

    loadOrder();
  }, [id]);

  if (!order) return <h2>Loading...</h2>;

return (
  <div style={{ padding: "20px" }}>
    <h2>Order Details 📦</h2>

    <p><strong>Order ID:</strong> {order.orderId}</p>
    <p><strong>Payment ID:</strong> {order.paymentId}</p>
    <p><strong>Email:</strong> {order.userEmail}</p>
    <p>
      <strong>Date:</strong>{" "}
      {new Date(order.createdAt).toLocaleString()}
    </p>

    <h3 style={{ marginTop: "20px" }}>Items:</h3>

    {order.items.map((item, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "15px",
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <img
          src={`http://localhost:5000${item.img}`}
          alt={item.name}
          width="80"
          height="80"
          style={{ objectFit: "cover", borderRadius: "10px" }}
        />

        <div>
          <h4>{item.name}</h4>
          <p>Price: {item.price}</p>
        </div>
      </div>
    ))}

    {/* ✅ Total Price */}
    <h3>
      Total: ₹
      {order.items.reduce(
        (sum, item) =>
          sum + parseInt(item.price.replace("₹", "")),
        0
      )}
    </h3>
  </div>
);
};

export default OrderDetails;