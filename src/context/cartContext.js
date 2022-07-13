import React, { useState, createContext } from "react";

// Provider and Consumer are connected through their "parent" context
const CartContext = createContext(null);

// Provider will be exported wrapped in CartProvider component.
const CartProvider = (props) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  return (
    <CartContext.Provider
      value={{
        cartItemCount,
        setCartItemCount,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export { CartProvider };

// I make this default since it will probably be exported most often.
export default CartContext;
