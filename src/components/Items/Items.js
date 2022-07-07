import React, { useState, useEffect } from "react";
import FilterCategory from "../FilterCategory/FilterCategory";
import Item from "./Item";
import withTryCatch from "../helpers/withTryCatch";
import { getRestaurant, filterCategory } from "../../services/itemService";

const Items = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [restaurant, setRestaurant] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    withTryCatch(async () => {
      const { data } = await getRestaurant();
      setRestaurant(data.restaurant);
      setItems(data.items);
    });
  }, []);

  const fetchItemsWithCategory = async () => {
    withTryCatch(async () => {
      const { data } = await filterCategory(selectedCategory);
      setItems(data);
    });
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
