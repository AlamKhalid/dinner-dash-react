import http from "./axios";
import { USER_ID } from "../constants";

const endPointUrl = "/carts";

export function createCart(body) {
  return http.post(endPointUrl, body);
}

export function getCart() {
  return http.get(endPointUrl, {
    params: {
      user_id: USER_ID,
    },
  });
}

export function deleteCart(id) {
  return http.delete(`${endPointUrl}/${id}`);
}
