import React, { useEffect, useState } from "react";
import "./CakeList.css";
import { useNavigate } from "react-router-dom";

const CakeList = ({
  cart,
  setCart,
  wishlist,
  setWishlist,
  selectedCategory,
  search,
}) => {
  const navigate = useNavigate();
  const [cakes, setCakes] = useState([]);

  // ✅ Fetch products
  const loadProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();

      console.log("Products from DB:", data); // ✅ DEBUG

      setCakes(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ✅ Add to cart
  const addToCart = (cake) => {
  const existing = cart.find(
    (item) => item._id === cake._id
  );

  if (existing) {
    const updatedCart = cart.map((item) =>
      item._id === cake._id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  } else {
    const updatedCart = [
      ...cart,
      { ...cake, quantity: 1 },
    ];

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  }
};

  // ✅ Wishlist toggle
  const toggleWishlist = (cake) => {
    const exists = wishlist.find((item) => item._id === cake._id);

    if (exists) {
      setWishlist(wishlist.filter((item) => item._id !== cake._id));
    } else {
      setWishlist([...wishlist, cake]);
    }
  };

  // ✅ FILTER (FIXED 🔥)
  const filteredCakes = cakes.filter((cake) => {
    const matchCategory =
      selectedCategory === "All" ||
      cake.category?.toLowerCase().trim() ===
        selectedCategory.toLowerCase().trim();

    const matchSearch = cake.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="cake-container">
      {filteredCakes.map((cake) => (
        <div
          key={cake._id}
          className="cake-card"
          onClick={() => navigate(`/cake/${cake._id}`)}
        >
          {/* ❤️ Wishlist */}
          <span
            className="heart p-2"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(cake);
            }}
          >
            {wishlist.find((item) => item._id === cake._id)
              ? "❤️"
              : "🤍"}
          </span>

          {/* ✅ Image */}
          <img 
            className="p-10"
            src={`http://localhost:5000${cake.img}`}
            alt={cake.name}
          />

          <h3>{cake.name}</h3>
          <p>₹{cake.price}</p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(cake);
            }}
          >
            Add to Cart
          </button>
          <br></br>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/payment", { state: { item: cake } });
            }}
          >
            Buy Now ⚡
          </button>
        </div>
      ))}
    </div>
  );
};

export default CakeList;