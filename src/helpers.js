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

export const getValidHits = hits =>
  hits.filter(hit => {
    const hasNull =
      !hit.title || !hit.url || !hit.author || !hit.num_comments || !hit.points;

    return !hasNull;
  });

export const searchUrl = (searchTerm, page = 0) =>
  `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
