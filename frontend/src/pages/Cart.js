import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate(); // ✅ navigation fix

  // Remove item
  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  // Calculate total price
  const total = cart.reduce((sum, item) => {
    return sum + parseInt(item.price.replace("₹", ""));
  }, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <p>Cart is empty 😢</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-left">
                <img src={item.img} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                </div>
              </div>

              <button onClick={() => removeItem(index)}>
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <h2>Total: ₹{total}</h2>

          {/* Payment Button */}
          <button
            className="pay-btn"
            onClick={() => navigate("/payment")}
          >
            Proceed to Payment 💳
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;