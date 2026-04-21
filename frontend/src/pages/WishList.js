import React from "react";
import "./WishList.css";

const Wishlist = ({ wishlist, setWishlist }) => {

  const removeItem = (name) => {
    setWishlist(wishlist.filter(item => item.name !== name));
  };

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p>No items in wishlist 😢</p>
      ) : (
        wishlist.map((item, index) => (
          <div key={index} className="wishlist-item">

            <div className="wishlist-left">
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
            </div>

            <button onClick={() => removeItem(item.name)}>
              Remove
            </button>

          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;