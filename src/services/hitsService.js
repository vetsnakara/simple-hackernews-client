import http from "./httpService";
import { searchUrl } from "../helpers";

export const getHits = (searchKey, page) => {
  const url = searchUrl(searchKey, page);
  return http.get(url);
};
