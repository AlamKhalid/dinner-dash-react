import React, { useState, useEffect } from "react";
import http from "../../axios";

const FilterCategory = ({
  selectedCategory,
  setSelectedCategory,
  fetchItemsWithCategory,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await http.get("/categories");
      setCategories(["all", "popular", ...data]);
    };
    fetchCategories();
  }, []);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="d-flex justify-content-end mb-4 align-items-center">
      <span>Browse items by category | popularity</span>
      <div className="col-2 mx-3">
        <select
          className="form-select"
          onChange={({ target }) => setSelectedCategory(target.value)}
          value={selectedCategory}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {capitalize(category)}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-dark" onClick={fetchItemsWithCategory}>
        Search
      </button>
    </div>
  );
};

export default FilterCategory;
