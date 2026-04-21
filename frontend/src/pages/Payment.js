import React from "react";

const Payment = ({ cart }) => {

  const total = cart.reduce((sum, item) => {
    return sum + parseInt(item.price.replace("₹", ""));
  }, 0);

  const handlePayment = async () => {
    try {
      // 👉 Create order from backend
      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      const data = await res.json();

      const options = {
        key: "rzp_test_xxxxx", // 🔥 YOUR KEY ID
        amount: data.amount,
        currency: "INR",
        name: "CakeShop",
        description: "Cake Purchase",
        order_id: data.id,

        handler: async function (response) {
          alert("Payment Successful 🎉");

          // 👉 Save order to backend
          await fetch("http://localhost:5000/save-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              cart: cart,
            }),
          });
        },

        prefill: {
          name: "Customer",
          email: "test@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#ec4899",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      console.error(error);
      alert("Payment failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Total Amount: ₹{total}</h2>

      <button onClick={handlePayment}>
        Pay Now 💳
      </button>
    </div>
  );
};

export default Payment;