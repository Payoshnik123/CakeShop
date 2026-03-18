import React from "react";
import "./CakeList.css";

import cake1 from "../assets/cake1.jpg";
import cake2 from "../assets/cake2.jpg";
import cake3 from "../assets/cake3.jpg";
import cake4 from "../assets/cake4.jpg";
import cake5 from "../assets/cake5.jpg";
import cake6 from "../assets/cake6.jpg";

// Cake Data
const cakes = [
  { name: "Chocolate Cake", price: "₹500", img: cake1, category: "Chocolate" },
  { name: "Red Velvet", price: "₹700", img: cake2, category: "Red Velvet" },
  { name: "Truffle Cake", price: "₹650", img: cake3, category: "Truffle" },
  { name: "Black Forest", price: "₹600", img: cake4, category: "Chocolate" },
  { name: "Strawberry Cake", price: "₹550", img: cake5, category: "Fruit" },
  { name: "Vanilla Cake", price: "₹450", img: cake6, category: "Vanilla" },
  { name: "Fruit Cake", price: "₹800", img: cake4, category: "Fruit" },
];

const CakeList = ({ cart, setCart, selectedCategory, search }) => {

  // ✅ Add to Cart Function
  const addToCart = (cake) => {
    setCart([...cart, cake]);
    alert(`${cake.name} added to cart 🛒`);
  };

  // ✅ Filter Logic (Category + Search)
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
      {filteredCakes.length > 0 ? (
        filteredCakes.map((cake, index) => (
          <div key={index} className="cake-card">
            <img src={cake.img} alt={cake.name} />
            <h3>{cake.name}</h3>
            <p>{cake.price}</p>

            <button onClick={() => addToCart(cake)}>
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <h2 style={{ textAlign: "center" }}>No cakes found 😢</h2>
      )}
    </div>
  );
};

export default CakeList;