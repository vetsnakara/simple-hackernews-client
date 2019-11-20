import React from "react";

const Search = ({ children, onSubmit, ...rest }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" {...rest} autoFocus placeholder="Search ..." />
      <button type="submit">{children}</button>
    </form>
  );
};

export default Search;
