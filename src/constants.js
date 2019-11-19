const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

export const DEFAULT_QUERY = "redux";
export const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`;
