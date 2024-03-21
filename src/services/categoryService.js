import http from "./axios";

const endPointUrl = "/categories";

export function getCategories() {
  return http.get(endPointUrl);
}
