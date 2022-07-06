import React, { createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Items from "./components/Items/Items";
import "./App.css";
import { CartProvider } from "./context/cartContext";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Items />} />
        {/* <Route exact path="/cart" element{<Cart />} /> */}
      </Routes>
    </CartProvider>
  );
}

export default App;
