import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

import cake1 from "../assets/cake1.jpg";
import cake2 from "../assets/cake2.jpg";
import cake3 from "../assets/cake3.jpg";
import cake4 from "../assets/cake4.jpg";
import cake5 from "../assets/cake5.jpg";
import cake6 from "../assets/cake6.jpg";

const cakes = [
  { name: "Chocolate Cake", price: "₹500", img: cake1 },
  { name: "Red Velvet", price: "₹700", img: cake2 },
  { name: "Truffle Cake", price: "₹1", img: cake3 },
  { name: "Black Forest", price: "₹600", img: cake4 },
  { name: "Strawberry Cake", price: "₹550", img: cake5 },
  { name: "Vanilla Cake", price: "₹450", img: cake6 },
];

const ProductDetails = ({ cart, setCart }) => {
  const { id } = useParams();
  const cake = cakes[id];

  const addToCart = () => {
    setCart([...cart, cake]);
  };

  if (!cake) return <h2 style={{ padding: "20px" }}>Cake not found</h2>;

  return (
    <div className="details-container">
      <img src={cake.img} alt={cake.name} />

      <div className="details-info">
        <h2>{cake.name}</h2>
        <p>{cake.price}</p>

        <p>
          Delicious cake made with premium ingredients 🎂 Perfect for every
          occasion!
        </p>

        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;