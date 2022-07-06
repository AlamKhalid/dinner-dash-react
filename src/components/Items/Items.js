import React, { useState, useEffect } from "react";
import FilterCategory from "../FilterCategory/FilterCategory";
import Item from "./Item";
import http from "../../axios";

const restaurant_id = 10;

const Items = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loadedOnce, setLoadedOnce] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const { data } = await http.get(`restaurants/${restaurant_id}`);
      setRestaurant(data.restaurant);
      setItems(data.items);
      setLoadedOnce(true);
    };
    fetchRestaurant();
  }, []);

  const fetchItemsWithCategory = async () => {
    const { data } = await http.put(
      `restaurants/${restaurant_id}/category_filter`,
      { category_name: selectedCategory }
    );
    setItems(data);
  };

  return (
    <>
      <h1 className="text-center mb-3">{restaurant.name}</h1>
      <div className="container">
        <FilterCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          fetchItemsWithCategory={fetchItemsWithCategory}
        />
        <div className="row">
          {items.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Items;
