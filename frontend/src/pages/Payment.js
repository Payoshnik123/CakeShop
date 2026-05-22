import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const buyNowItem = location.state?.item;
  const items = buyNowItem ? [buyNowItem] : cart;

  const total = items.reduce((sum, item) => {
    return sum + parseInt(item.price.replace("₹", ""));
  }, 0);

  const handlePayment = async () => {
    try {
      if (!items || items.length === 0) {
        alert("No item selected ❌");
        return;
      }

      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        alert("Login first ⚠️");
        navigate("/login");
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay not loaded ❌");
        return;
      }

      // 👉 get address
      const savedAddress = JSON.parse(localStorage.getItem("address"));

      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const data = await res.json();

      const options = {
        key: "rzp_test_Sc97xDVVumDXnF",
        amount: data.amount,
        currency: "INR",
        order_id: data.id,

        handler: async function (response) {
          await fetch("http://localhost:5000/save-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              cart: items,
              userEmail,
              address: savedAddress, // ✅ NEW
            }),
          });

          if (!buyNowItem) {
            setCart([]);
            localStorage.removeItem("cart");
          }

          navigate("/success");
        },

        theme: { color: "#ec4899" },
      };

      new window.Razorpay(options).open();

    } catch (err) {
      console.log(err);
      alert("Payment failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Total: ₹{total}</h2>

      <button onClick={handlePayment} style={btn}>
        Pay Now 💳
      </button>
    </div>
  );
};

const btn = {
  background: "#ec4899",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
};

export default Payment;