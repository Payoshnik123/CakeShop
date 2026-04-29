import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import CategoryList from "./components/CategoryList";
import Admin from "./components/Admin";
import CakeList from "./components/CakeList";
import Cart from "./pages/Cart";
import Wishlist from "./pages/WishList";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import Payment from "./pages/Payment";
import OrderHistory from "./pages/OrderHistory";
import Login from "./pages/Login";
import OrderSuccess from "./pages/OrderSuccess";
import OrderDetails from "./pages/OrderDetails";
import Success from "./pages/Success";

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
        {/*Order history */}
        <Route path="/orders" element={<OrderHistory />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/*Payment */}
        <Route path="/payment" element={<Payment cart={cart} />} />

        {/*Product Details */}
        <Route
          path="/cake/:id"
          element={<ProductDetails cart={cart} setCart={setCart} />}
        />
        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} />}
        />

        {/*Order Success */}
        
        <Route path="/success" element={<OrderSuccess />} />

        {/*Admin */}

        <Route path="/admin" element={<Admin />} />       

        {/*Success */}        
        <Route path="/success" element={<Success />} />

        {/*Order Details */}

        <Route path="/order/:id" element={<OrderDetails />} />    
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
