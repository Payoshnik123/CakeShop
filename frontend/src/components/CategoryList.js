import React from "react";
import "./CategoryList.css";

import cake1 from "../assets/cake1.jpg";
import cake2 from "../assets/cake2.jpg";
import cake3 from "../assets/cake3.jpg";
import cake4 from "../assets/cake4.jpg";
import cake5 from "../assets/cake5.jpg";
import cake6 from "../assets/cake6.jpg";

// ✅ Category Data
const categories = [
  { name: "All", img: cake1 }, 
  { name: "Chocolate", img: cake1 },
  { name: "Red Velvet", img: cake2 },
  { name: "Truffle", img: cake3 },
  { name: "Fruit", img: cake4 },
  { name: "Vanilla", img: cake5 },
  { name: "Vanilla", img: cake6 },
];

const CategoryList = ({ setSelectedCategory, selectedCategory }) => {
  return (
    <div className="category-container">
      {categories.map((cat, index) => (
        <div
          key={index}
          className={`category-card ${
            selectedCategory === cat.name ? "active" : ""
          }`}
          onClick={() => setSelectedCategory(cat.name)}
        >
          <img src={cat.img} alt={cat.name} />
          <p>{cat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;