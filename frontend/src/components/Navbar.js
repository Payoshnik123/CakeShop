import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import Logo2 from "../assets/Logo2.png";

const Navbar = ({ cartCount, wishlistCount, setSearch }) => {
  const navigate = useNavigate();

  // ✅ Logged in user
  const userEmail = localStorage.getItem("userEmail");

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    alert("Logged out successfully");
    window.location.reload();
  };

  return (
    <nav className="navbar">

      {/* 🎂 LOGO SECTION */}
      <div
        className="logo-section"
        onClick={() => navigate("/")}
      >
        

        <img
          src={Logo2}
          alt="CakeKing"
          className="brand-logo"
        />
      </div>

      {/* 🔍 SEARCH BAR */}
      <div className="search-container">

        <input
          type="text"
          placeholder="Search delicious cakes..."
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="search-btn">
          🔍 Search
        </button>

      </div>

      {/* 📌 MENU */}
      <div className="menu">

        <span onClick={() => navigate("/")}>
          🏠 Home
        </span>

        <span onClick={() => navigate("/cart")}>
          🛒 Cart ({cartCount})
        </span>

        <span onClick={() => navigate("/wishlist")}>
          ❤️ Wishlist ({wishlistCount})
        </span>

        <span onClick={() => navigate("/orders")}>
          📦 Orders
        </span>

        <span onClick={() => navigate("/admin")}>
          🛠️ Admin
        </span>

        {/* 👤 USER */}
        {userEmail ? (
          <>
            <span className="user">
              👤 {userEmail.split("@")[0]}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        )}

      </div>
    </nav>
  );
};

export default Navbar;