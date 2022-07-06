import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav-div">
      <Link to="/" className="logo">
        Dinner Dash
      </Link>
      <div className="d-flex align-items-center">
        <button className="btn btn-outline-light mr-3"> Sign Up</button>
        <button className="btn btn-outline-light mr-3"> Sign In</button>
        <div className="cart-filled-div">
          <FontAwesomeIcon icon={faCartShopping} size="lg" />
          {/* <span class='cart-badge badge badge-danger <% show_cart_badge %>' id='cart-badge'><%= cart_item_count %></span>
        <%= fa_icon 'shopping-cart', class: 'cart-icon' %> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
