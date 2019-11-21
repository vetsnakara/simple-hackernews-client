import {
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
  DEFAULT_HPP
} from "./constants";

export const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

export const filterHitsWithNull = items =>
  items.filter(item => {
    const hasNull =
      !item.title ||
      !item.url ||
      !item.author ||
      !item.num_comments ||
      !item.points;

    return !hasNull;
  });

export const searchUrl = (searchTerm, page = 0) =>
  `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
