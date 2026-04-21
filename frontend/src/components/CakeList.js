import React from "react";
import "./CakeList.css";
import { useNavigate } from "react-router-dom";

import cake1 from "../assets/cake1.jpg";
import cake2 from "../assets/cake2.jpg";
import cake3 from "../assets/cake3.jpg";
import cake4 from "../assets/cake4.jpg";
import cake5 from "../assets/cake5.jpg";
import cake6 from "../assets/cake4.jpg";

const cakes = [
  { name: "Chocolate Cake", price: "₹500", img: cake1, category: "Chocolate" },
  { name: "Red Velvet", price: "₹700", img: cake2, category: "Red Velvet" },
  { name: "Truffle Cake", price: "₹1", img: cake3, category: "Truffle" },
  { name: "Black Forest", price: "₹600", img: cake4, category: "Chocolate" },
  { name: "Strawberry Cake", price: "₹550", img: cake5, category: "Fruit" },
  { name: "Vanilla Cake", price: "₹450", img: cake6, category: "Vanilla" },
];

const CakeList = ({
  cart,
  setCart,
  wishlist,
  setWishlist,
  selectedCategory,
  search,
}) => {
  const navigate = useNavigate();

  const addToCart = (cake) => {
    setCart([...cart, cake]);
  };

  const toggleWishlist = (cake) => {
    const exists = wishlist.find((item) => item.name === cake.name);

    if (exists) {
      setWishlist(wishlist.filter((item) => item.name !== cake.name));
    } else {
      setWishlist([...wishlist, cake]);
    }
  };

  const filteredCakes = cakes.filter((cake) => {
    const matchCategory =
      selectedCategory === "All" || cake.category === selectedCategory;

    const matchSearch = cake.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="cake-container">
      {filteredCakes.map((cake, index) => (
        <div
          key={index}
          className="cake-card"
          onClick={() => navigate(`/cake/${index}`)}
        >
          {/* ❤️ Wishlist */}
          <span
            className="heart"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(cake);
            }}
          >
            {wishlist.find((item) => item.name === cake.name)
              ? "❤️"
              : "🤍"}
          </span>

          <img src={cake.img} alt={cake.name} />
          <h3>{cake.name}</h3>
          <p>{cake.price}</p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(cake);
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default CakeList;