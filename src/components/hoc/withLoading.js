import React from "react";
import PropTypes from "prop-types";

const withLoading = Component => ({ isLoading, children, ...props }) => {
  return (
    <Component disabled={isLoading} {...props}>
      {isLoading ? "Loading ..." : children}
    </Component>
  );
};

withLoading.defaultProps = {
  isLoading: false
};

withLoading.propTypes = {
  isLoading: PropTypes.bool
};

export default withLoading;
