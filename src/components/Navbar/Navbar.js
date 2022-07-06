import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartConsumer from "../../context/cartContext";
import "./Navbar.css";

const Navbar = () => {
  const { cartItemCount } = useContext(CartConsumer);

  return (
    <nav className="nav-div">
      <Link to="/" className="logo">
        Dinner Dash
      </Link>
      <div className="d-flex align-items-center">
        <button className="btn btn-outline-light mr-3"> Sign Up</button>
        <button className="btn btn-outline-light mr-3"> Sign In</button>
        <Link to="/cart">
          <div className="cart-filled-div">
            <FontAwesomeIcon icon={faCartShopping} size="lg" />
            {cartItemCount !== 0 && (
              <span className="cart-badge badge bg-danger">
                {cartItemCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
