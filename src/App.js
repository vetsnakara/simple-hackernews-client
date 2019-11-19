import React from "react";

import Search from "./components/Search";
import Table from "./components/Table";

import { url, DEFAULT_QUERY } from "./constants";

import "./App.css";

class App extends React.Component {
  state = { result: null, searchTerm: DEFAULT_QUERY };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories = result => this.setState({ result });

  fetchSearchTopStories = searchTerm => {
    const searchUrl = `${url}${searchTerm}`;

    fetch(searchUrl)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => console.log(error));
  };

  onSearchSubmit = () => {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  };

  onDismiss = id => {
    const isNotID = item => item.objectID !== id;
    this.setState(({ result }) => ({
      result: { ...result, hits: result.hits.filter(isNotID) }
    }));
  };

  onSearchChange = ({ target: { value } }) =>
    this.setState({ searchTerm: value });

  render() {
    const { result, searchTerm } = this.state;

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {result && (
          <Table
            list={result.hits}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        )}
      </div>
    );
  }
}

export default App;
