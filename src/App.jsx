import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import Items from "./components/Items/Items";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./context/cartContext";
import "./App.css";

const App = () => {
  return (
    <CartProvider>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Items />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </CartProvider>
  );
};

export default App;
