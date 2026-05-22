import React from "react";
import "./WishList.css";

const Wishlist = ({ wishlist, setWishlist, cart, setCart }) => {

  // ✅ remove using _id (safe)
  const removeItem = (id) => {
    setWishlist(wishlist.filter(item => item._id !== id));
  };

  // ✅ add to cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p className="empty">No items in wishlist 😢</p>
      ) : (
        wishlist.map((item) => (
          <div key={item._id} className="wishlist-item">

            <div className="wishlist-left">
              {/* ✅ FIX IMAGE */}
              <img
                src={`http://localhost:5000${item.img}`}
                alt={item.name}
              />
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>
            </div>

            <div className="wishlist-actions">
              <button
                className="add-btn"
                onClick={() => addToCart(item)}
              >
                Add to Cart 🛒
              </button>

              <button
                className="remove-btn"
                onClick={() => removeItem(item._id)}
              >
                Remove ❌
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;