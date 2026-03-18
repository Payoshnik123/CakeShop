import { useState } from "react";
import Navbar from "./components/Navbar";
import CategoryList from "./components/CategoryList";
import CakeList from "./components/CakeList";
import Footer from './components/Footer';

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar cartCount={cart.length} setSearch={setSearch} />
      
      <CategoryList setSelectedCategory={setSelectedCategory} />

      <CakeList
        cart={cart}
        setCart={setCart}
        selectedCategory={selectedCategory}
        search={search}
      />
      <Footer/>
    </>
  );
}

export default App;