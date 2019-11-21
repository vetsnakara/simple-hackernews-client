import React from "react";
import PropTypes from "prop-types";

import Loading from "./Loading";

const WithLoading = ({ children, isLoading }) =>
  isLoading ? <Loading /> : children;

WithLoading.defaultProps = {
  isLoading: false
};

WithLoading.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default WithLoading;
