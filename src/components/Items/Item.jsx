import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { createCart } from "../../services/cartService";
import { RESTAURANT_ID, USER_ID } from "../../constants";
import stockImg from "../../assets/images/stock_img.jpeg";
import withTryCatch from "../helpers/withTryCatch";
import CartContext from "../../context/cartContext";

const Item = ({ item }) => {
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { setCartItemCount } = useContext(CartContext);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleAddCart = async () => {
    withTryCatch(
      async () => {
        setAddingToCart(true);
        const { data } = await createCart({
          restaurant_id: RESTAURANT_ID,
          quantity,
          item_id: item.id,
          user_id: USER_ID,
        });
        if (data.success && data.item_count) {
          setCartItemCount(data.item_count);
          toast.info("Item added to cart successfully");
        } else {
          toast.error("An uknown error occured");
        }
      },
      null,
      () => setAddingToCart(false)
    );
  };

  const { name, description, price, item_picture_url, retired } = item;
  return (
    <div className="col-md-4 .offset-md-1 mb-4">
      <div className="card">
        {item_picture_url.length ? (
          <img src={item_picture_url} height="300" alt="item_picture" />
        ) : (
          <img src={stockImg} height="300" alt="item_picture" />
        )}

        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <p>More</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <div>
              <span>Price:</span>
              <strong>Rs. {price}</strong>
            </div>
            <div className="d-flex align-items-center justify-content-between w-25">
              <button
                className="btn btn-dark"
                disabled={quantity === 1}
                onClick={decrementQuantity}
              >
                -
              </button>
              <span className="quantity-count">{quantity}</span>
              <button className="btn btn-dark" onClick={incrementQuantity}>
                +
              </button>
            </div>
          </li>
          <li className="list-group-item text-center">
            {retired ? (
              <p>
                <strong>Item is retired. Cannot be added to cart</strong>
              </p>
            ) : (
              <button
                className="btn btn-dark"
                onClick={handleAddCart}
                disabled={addingToCart}
              >
                {addingToCart ? (
                  <div className="d-flex align-items-center">
                    <div
                      className="spinner-border spinner-border-sm text-light mr-3"
                      role="status"
                    ></div>
                    <span>Adding...</span>
                  </div>
                ) : (
                  "Add to cart"
                )}
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Item;
