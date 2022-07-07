import http from "./axios";

const endPointUrl = "/cart_items";

export function editCartItem(body) {
  return http.put(`${endPointUrl}/update`, body);
}

export function deleteCartItem(body) {
  return http.delete(`${endPointUrl}/destroy`, body);
}
