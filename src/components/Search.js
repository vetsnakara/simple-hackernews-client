import React from "react";

const Search = ({ children, ...rest }) => (
  <form>
    {children} <input type="text" {...rest} />
  </form>
);

export default Search;
