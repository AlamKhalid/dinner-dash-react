import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCart, getCart } from "../../services/cartService";
import CartItem from "./CartItem";
import withTryCatch from "../helpers/withTryCatch";
import handleConfirm from "../helpers/handleConfirm";
import CartContext from "../../context/cartContext";
import Loader from "../Loader/Loader";

const Cart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(null);
  const { cartItemCount, setCartItemCount } = useContext(CartContext);

  useEffect(() => {
    withTryCatch(
      async () => {
        setLoading(true);
        const { data } = await getCart();
        setCart(data);
        if (data?.cart_order_items)
          setCartItemCount(data.cart_order_items.length);
      },
      null,
      () => setLoading(false)
    );
  }, [cartItemCount, setCartItemCount]);

  const handleClearCartConfirm = () => {
    handleConfirm(
      "Confirm to clear cart",
      "Are you sure to do this?",
      handleClearCart
    );
  };

  const handleClearCart = async () => {
    withTryCatch(
      async () => {
        setLoading(true);
        const response = await deleteCart(cart.id);
        if (response.status === 200) {
          setCartItemCount(0);
          setCart(null);
          toast.info("Cart has been cleared successfully");
        }
      },
      null,
      () => setLoading(false)
    );
  };

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <div className="container">
      <h1 className="text-center mb-3">Cart</h1>
      {cart ? (
        <table className="table table-hover">
          <caption>Total items in cart: {cartItemCount}</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col" className="text-center">
                Change Quantity
              </th>
              <th scope="col" className="text-center">
                Remove from Cart
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.cart_order_items.map((cart_order_item, idx) => (
              <CartItem
                key={cart_order_item.id}
                cart_order_item={cart_order_item}
                idx={idx}
                item={cart.items[idx]}
                setCart={setCart}
              />
            ))}
            <tr className="table-secondary">
              <td></td>
              <td></td>
              <td className="font-weight-bold">Total Price</td>
              <td id="total-price-cart">Rs. {cart.total_price}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      ) : (
        <h6 className="text-center">
          Cart is empty. Start filling up your basket.
        </h6>
      )}
      {cart && (
        <button
          className="btn btn-danger mr-3"
          onClick={handleClearCartConfirm}
        >
          Clear Cart
        </button>
      )}
      <button className="btn btn-info" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default Cart;
