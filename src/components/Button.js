import React from "react";

const Button = ({ children, ...rest }) => (
  <button type="button" {...rest}>
    {children}
  </button>
);

export default Button;
