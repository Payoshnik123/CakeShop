import React from "react";
import { useNavigate } from "react-router-dom";

const Payment = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => {
    return sum + parseInt(item.price.replace("₹", ""));
  }, 0);

  const handlePayment = async () => {
    try {
      console.log("🚀 Payment started");

      // ✅ Check cart
      if (total <= 0) {
        alert("Cart is empty ❌");
        return;
      }

      // ✅ Check login
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        alert("Please login first ⚠️");
        navigate("/login");
        return;
      }

      // ✅ Check Razorpay loaded
      if (!window.Razorpay) {
        alert("Razorpay not loaded ❌");
        return;
      }

      // ✅ Create order from backend
      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      if (!res.ok) {
        throw new Error("Backend not responding");
      }

      const data = await res.json();
      console.log("✅ Order created:", data);

      const options = {
        key: "rzp_test_Sc97xDVVumDXnF",
        amount: data.amount,
        currency: "INR",
        name: "CakeShop",
        description: "Cake Purchase",
        order_id: data.id,

        handler: async function (response) {
          try {
            console.log("💰 Payment success:", response);

            // ✅ Save order
            await fetch("http://localhost:5000/save-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                cart: cart,
                userEmail: userEmail,
              }),
            });

            // ✅ Clear cart
            setCart([]);
            localStorage.removeItem("cart");

            alert("Payment Successful 🎉");
            navigate("/success");

          } catch (err) {
            console.error("❌ Save order error:", err);
            alert("Order saving failed ❌");
          }
        },

        modal: {
          ondismiss: function () {
            alert("Payment cancelled ❌");
          },
        },

        prefill: {
          name: "Customer",
          email: userEmail,
          contact: "9999999999",
        },

        theme: {
          color: "#ec4899",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      console.error("🔥 PAYMENT ERROR:", error);
      alert("Payment failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Total Amount: ₹{total}</h2>

      <button onClick={handlePayment}>
        Pay Now 💳
      </button>
    </div>
  );
};

export default Payment;