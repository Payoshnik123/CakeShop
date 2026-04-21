import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ cartCount, wishlistCount, setSearch }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        🎂 CakeKing
      </div>

      {/* Search */}
      <div className="search">
        <input
          type="text"
          placeholder="Search cakes..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Menu */}
      <div className="menu">
        <span onClick={() => navigate("/")}>🏠 Home</span>

        <span>Payment</span>

        <span onClick={() => navigate("/cart")}>
          🛒 Cart ({cartCount})
        </span>

        <span onClick={() => navigate("/wishlist")}>
          ❤️ Shortlist ({wishlistCount})
        </span>

        <span>👤</span>
      </div>

    </nav>
  );
};

export default Navbar;