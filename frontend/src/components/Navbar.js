import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ cartCount, wishlistCount, setSearch }) => {
  const navigate = useNavigate();

  // ✅ Get logged-in user
  const userEmail = localStorage.getItem("userEmail");

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    alert("Logged out successfully");
    window.location.reload();
  };

  return (
    <nav className="navbar">

      {/* 🔥 Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        🎂 CakeKing
      </div>

      {/* 🔍 Search */}
      <div className="search">
        <input
          type="text"
          placeholder="Search cakes..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 📌 Menu */}
      <div className="menu">

        <span onClick={() => navigate("/")}>
          🏠 Home
        </span>

        <span onClick={() => navigate("/cart")}>
          🛒 Cart ({cartCount})
        </span>

        <span onClick={() => navigate("/wishlist")}>
          ❤️ Shortlist ({wishlistCount})
        </span>

        <span onClick={() => navigate("/orders")}>
          📦 Orders
        </span>

        <span onClick={()=> navigate("/admin")}>
          🛠️ Admin
        </span>

        {/* 👤 User Section */}
        {userEmail ? (
          <>
            <span className="user">
              👤 {userEmail.split("@")[0]}
            </span>

            <button className="logout-btn" onClick={handleLogout}>
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