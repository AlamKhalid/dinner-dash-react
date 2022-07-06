import React, { useState, useEffect } from "react";
import FilterCategory from "../FilterCategory/FilterCategory";
import Item from "./Item";
import http from "../../axios";
import { RESTAURANT_ID } from "../../constants";

const Items = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [restaurant, setRestaurant] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const { data } = await http.get(`restaurants/${RESTAURANT_ID}`);
      setRestaurant(data.restaurant);
      setItems(data.items);
    };
    fetchRestaurant();
  }, []);

  const fetchItemsWithCategory = async () => {
    const { data } = await http.put(
      `restaurants/${RESTAURANT_ID}/category_filter`,
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
