import React from "react";

import Search from "./components/Search";
import Table from "./components/Table";

import { url, DEFAULT_QUERY } from "./constants";

import "./App.css";

class App extends React.Component {
  state = { result: null, searchTerm: DEFAULT_QUERY };

  componentDidMount() {
    const { searchTerm } = this.state;

    const searchUrl = `${url}${searchTerm}`;

    fetch(searchUrl)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => console.log(error));
  }

  setSearchTopStories = result => this.setState({ result });

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
          <Search value={searchTerm} onChange={this.onSearchChange}>
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
