import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import Items from "./components/Items/Items";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./context/cartContext";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";

function App() {
  return (
    <CartProvider>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Items />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
