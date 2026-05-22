import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const res = await fetch(`http://localhost:5000/orders/${id}`);
        const data = await res.json();

        console.log("ORDER DATA 👉", data); // ✅ DEBUG

        setOrder(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadOrder();
  }, [id]);

  if (!order) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  /* ================= PDF DOWNLOAD ================= */
  const downloadInvoice = () => {
  if (!order || !order.items) {
    alert("Order data missing");
    return;
  }

  const doc = new jsPDF();

  // ================= HEADER =================

  doc.setFillColor(236, 72, 153);
  doc.rect(0, 0, 210, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text("CakeKing", 20, 20);

  doc.setFontSize(12);
  doc.text("Sweetness Delivered", 20, 28);

  // ================= TITLE =================

  doc.setTextColor(0, 0, 0);

  doc.setFontSize(20);
  doc.text("INVOICE", 150, 20);

  // ================= ORDER INFO =================

  doc.setFontSize(11);

  doc.text(
    `Invoice ID: ${order.orderId}`,
    20,
    50
  );

  doc.text(
    `Payment ID: ${order.paymentId}`,
    20,
    58
  );

  doc.text(
    `Customer: ${order.userEmail}`,
    20,
    66
  );

  doc.text(
    `Date: ${new Date(
      order.createdAt
    ).toLocaleString()}`,
    20,
    74
  );

  // ================= TABLE HEADER =================

  let y = 95;

  doc.setFillColor(240, 240, 240);
  doc.rect(20, y, 170, 10, "F");

  doc.setFontSize(12);

  doc.text("No", 25, y + 7);
  doc.text("Cake", 45, y + 7);
  doc.text("Price", 160, y + 7);

  y += 15;

  // ================= ITEMS =================

  let total = 0;

  order.items.forEach((item, index) => {
    const price = parseInt(
      item.price?.replace("₹", "") || 0
    );

    total += price;

    doc.text(`${index + 1}`, 25, y);

    doc.text(item.name, 45, y);

    doc.text(`Rs. ${price}`, 160, y);

    y += 10;
  });

  // ================= TOTAL =================

  y += 10;

  doc.setDrawColor(200);

  doc.line(20, y, 190, y);

  y += 10;

  doc.setFontSize(16);

  doc.text(`Total Amount: Rs. ${total}`, 130, y);

  // ================= STATUS =================

  y += 20;

  doc.setFontSize(12);

  doc.text(
    `Order Status: ${order.status || "Pending"}`,
    20,
    y
  );

  // ================= FOOTER =================

  y += 30;

  doc.setFontSize(11);

  doc.text(
    "Thank you for ordering from CakeShop!",
    20,
    y
  );

  doc.text(
    "We hope to serve you again.",
    20,
    y + 8
  );

  // ================= SAVE =================

  doc.save(`invoice_${order.orderId}.pdf`);
};
  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Details 📦</h2>

      <p><strong>Order ID:</strong> {order.orderId || order._id}</p>
      <p><strong>Email:</strong> {order.userEmail}</p>

      <p>
        <strong>Date:</strong>{" "}
        {order.createdAt
          ? new Date(order.createdAt).toLocaleString()
          : "N/A"}
      </p>

      {/* ITEMS */}
      <h3>Items:</h3>

      {order.items?.length > 0 ? (
        order.items.map((item, i) => (
          <div key={i} style={itemCard}>
            <img
              src={`http://localhost:5000${item.img}`}
              alt={item.name}
              width="80"
              height="80"
            />
            <div>
              <h4>{item.name}</h4>
              <p>{item.price}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No items ❌</p>
      )}

      {/* TOTAL */}
      <h3>
        Total: ₹
        {order.items?.reduce(
          (sum, item) =>
            sum + parseInt(item.price?.replace("₹", "") || 0),
          0
        )}
      </h3>

      {/* ✅ DOWNLOAD BUTTON */}
      <button
        onClick={downloadInvoice}
        style={invoiceBtn}
      >
        Download Invoice 🧾
      </button>
    </div>
  );
};

/* 🎨 styles */

const invoiceBtn = {
  marginTop: "20px",
  background: "#ec4899",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
};

const itemCard = {
  display: "flex",
  gap: "15px",
  marginBottom: "10px",
  alignItems: "center",
};

export default OrderDetails;