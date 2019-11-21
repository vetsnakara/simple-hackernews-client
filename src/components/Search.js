import React from "react";
import PropTypes from "prop-types";

class Search extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    children: "Search"
  };

  input = React.createRef();

  componentDidMount() {
    this.input.current.focus();
  }

  render() {
    const { children, onSubmit, ...rest } = this.props;

    const handleSubmit = e => {
      e.preventDefault();
      onSubmit();
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          {...rest}
          autoFocus
          placeholder="Search ..."
          ref={this.input}
        />
        <button type="submit">{children}</button>
      </form>
    );
  }
}

export default Search;
