import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import CategoryList from "./components/CategoryList";
import CakeList from "./components/CakeList";
import Cart from "./pages/Cart";
import Wishlist from "./pages/WishList";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import Payment from "./pages/Payment";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Navbar
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        setSearch={setSearch}
      />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <CategoryList
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />

              <CakeList
                cart={cart}
                setCart={setCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
                selectedCategory={selectedCategory}
                search={search}
              />
            </>
          }
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} />}
        />

        {/*payment */}
        <Route
          path="/payment"
          element={<Payment cart={cart} />}
        />
        {/*ProductDetails */}
        <Route
            path="/cake/:id"
            element={<ProductDetails cart={cart} setCart={setCart} />}
          />
        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={
            <Wishlist wishlist={wishlist} setWishlist={setWishlist} />
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;