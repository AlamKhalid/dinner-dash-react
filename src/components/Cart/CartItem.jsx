import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { editCartItem, deleteCartItem } from "../../services/cartItemService";
import { USER_ID } from "../../constants";
import handleConfirm from "../helpers/handleConfirm";
import CartContext from "../../context/cartContext";
import withTryCatch from "../helpers/withTryCatch";

import "./CartItem.css";

const CartItem = ({ cart_order_item, item, idx, setCart }) => {
  const [changingCartItem, setChangingCartItem] = useState(false);
  const { cartItemCount, setCartItemCount } = useContext(CartContext);

  const cartItemParams = (quantity, button) => {
    return {
      id: cart_order_item.id,
      user_id: USER_ID,
      quantity,
      button,
    };
  };

  const incrementQuantity = () => {
    withTryCatch(
      async () => {
        setChangingCartItem(true);
        const { data } = await editCartItem(
          cartItemParams(cart_order_item.quantity + 1, "add")
        );
        setCart(data);
      },
      null,
      () => setChangingCartItem(false)
    );
  };

  const decrementQuantity = () => {
    if (cart_order_item.quantity === 1) return;

    withTryCatch(
      async () => {
        setChangingCartItem(true);
        const { data } = await editCartItem(
          cartItemParams(cart_order_item.quantity - 1, "remove")
        );
        setCart(data);
      },
      null,
      () => setChangingCartItem(false)
    );
  };

  const handleClearCartItemConfirm = () => {
    handleConfirm(
      "Confirm to remove this cart item",
      "Are you sure to do this?",
      handleClearCartItem
    );
  };

  const handleClearCartItem = async () => {
    withTryCatch(
      async () => {
        setChangingCartItem(true);
        const response = await deleteCartItem({
          data: {
            id: cart_order_item.id,
            user_id: USER_ID,
          },
        });
        if (response.status === 200) {
          setCartItemCount(cartItemCount - 1);
          toast.info("Item has been removed successfully");
          if (cartItemCount === 1)
            toast.info("Cart has been cleared successfully");
        }
      },
      null,
      () => setChangingCartItem(false)
    );
  };

  return changingCartItem ? (
    <tr>
      <td colSpan={6} className="text-center">
        <div className="spinner-border spinner-border-sm" role="status"></div>
      </td>
    </tr>
  ) : (
    <tr key={cart_order_item.id}>
      <th scope="row">{idx + 1}</th>
      <td>{item.name}</td>
      <td>{cart_order_item.quantity}</td>
      <td>Rs. {item.price}</td>
      <td className="text-center">
        <button
          className="btn btn-dark mr-3"
          disabled={cart_order_item.quantity === 1}
          onClick={decrementQuantity}
        >
          -
        </button>
        <button className="btn btn-dark" onClick={incrementQuantity}>
          +
        </button>
      </td>
      <td className="text-center">
        <FontAwesomeIcon
          icon={faTrash}
          size="lg"
          className="text-danger cart-item-delete-icon"
          onClick={handleClearCartItemConfirm}
        />
      </td>
    </tr>
  );
};

export default CartItem;
