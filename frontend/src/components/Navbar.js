import React from "react";
import "./Navbar.css";

const Navbar = ({ cartCount, setSearch }) => {
  return (
    <nav className="navbar">

      <div className="logo">🎂 CakeShop</div>

      <div className="search">
        <input
          type="text"
          placeholder="Search cakes..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="menu">
        <span>🏠 Home</span>
        <span>Payment</span>
        <span>🛒 Cart ({cartCount})</span>
        <span>❤️ Shortlist</span>
        <span>👤</span>
      </div>

    </nav>
  );
};

export default Navbar;