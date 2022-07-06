import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Items from "./components/Items/Items";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Items />} />
        {/* <Route exact path="/cart" element{<Cart />} /> */}
      </Routes>
    </>
  );
}

export default App;
