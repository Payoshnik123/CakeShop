import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Top Section */}
      <div className="footer-top">

        {/* Brand */}
        <div className="footer-section">
          <h2>🎂 CakeShop</h2>
          <p>Delivering happiness with every cake ❤️</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <p>Home</p>
          <p>Cart</p>
          <p>Payment</p>
          <p>Shortlist</p>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3>Categories</h3>
          <p>Chocolate Cakes</p>
          <p>Birthday Cakes</p>
          <p>Anniversary Cakes</p>
          <p>Truffle Cakes</p>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@cakeshop.com</p>
          <p>Phone: +91 9922992021</p>
          <p>Umarkhed,Yavatmal,India</p>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© 2026 CakeShop. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;