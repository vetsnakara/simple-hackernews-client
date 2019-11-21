import React from "react";
import PropTypes from "prop-types";

import Button from "./LoadingButton";

class Search extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    children: PropTypes.node
  };

  static defaultProps = {
    isLoading: false,
    children: "Search"
  };

  input = React.createRef();

  componentDidMount() {
    this.input.current.focus();
  }

  render() {
    const { value, onSubmit, onChange, isLoading, children } = this.props;

    const handleSubmit = e => {
      e.preventDefault();
      onSubmit();
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          autoFocus
          placeholder="Search ..."
          ref={this.input}
        />
        <Button type="submit" isLoading={isLoading}>
          {children}
        </Button>
      </form>
    );
  }
}

export default Search;
