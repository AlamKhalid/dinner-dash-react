import React, { useState, useEffect, useContext } from "react";
import FilterCategory from "../FilterCategory/FilterCategory";
import Item from "./Item";
import Loader from "../Loader/Loader";
import withTryCatch from "../helpers/withTryCatch";
import CartContext from "../../context/cartContext";
import { getRestaurant, filterCategory } from "../../services/itemService";
import { getCart } from "../../services/cartService";

const Items = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [restaurant, setRestaurant] = useState({});
  const [items, setItems] = useState([]);
  const { setCartItemCount } = useContext(CartContext);

  useEffect(() => {
    withTryCatch(
      async () => {
        const { data } = await getRestaurant();
        const { data: cart } = await getCart();
        setRestaurant(data.restaurant);
        setItems(data.items);
        if (cart?.cart_order_items)
          setCartItemCount(cart.cart_order_items.length);
      },
      null,
      () => setLoading(false)
    );
  }, [setCartItemCount]);

  const fetchItemsWithCategory = async () => {
    withTryCatch(
      async () => {
        setLoading(true);
        const { data } = await filterCategory(selectedCategory);
        setItems(data);
      },
      null,
      () => setLoading(false)
    );
  };

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <>
      <h1 className="text-center mb-3">{restaurant.name}</h1>
      <div className="container">
        <FilterCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          fetchItemsWithCategory={fetchItemsWithCategory}
        />
        {items.length ? (
          <div className="row">
            {items.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <h5>No items found.</h5>
        )}
      </div>
    </>
  );
};

export default Items;
