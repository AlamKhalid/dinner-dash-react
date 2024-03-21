import http from "./axios";
import { RESTAURANT_ID } from "../constants";

const endPointUrl = "/restaurants";

export function getRestaurant() {
  return http.get(`${endPointUrl}/${RESTAURANT_ID}`);
}

export function filterCategory(category) {
  return http.put(`${endPointUrl}/${RESTAURANT_ID}/category_filter`, {
    category_name: category,
  });
}
