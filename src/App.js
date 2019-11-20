import React from "react";

import Button from "./components/Button";
import Search from "./components/Search";
import Table from "./components/Table";

import { url, DEFAULT_QUERY } from "./constants";

import "./App.css";

class App extends React.Component {
  state = { result: null, searchTerm: "", searchKey: DEFAULT_QUERY };

  componentDidMount() {
    const { searchKey } = this.state;
    this.fetchStories(searchKey);
  }

  fetchStories = (searchTerm, page) => {
    const searchUrl = url(searchTerm, page);

    fetch(searchUrl)
      .then(response => response.json())
      .then(result => this.setSearchResult(result))
      .catch(error => console.log(error));
  };

  handleNewSearch = () => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchStories(searchTerm);
  };

  handleNextSearch = () => {
    const {
      searchKey,
      result: { page }
    } = this.state;
    this.fetchStories(searchKey, page + 1);
  };

  setSearchResult = ({ hits: newHits, page }) => {
    const { result } = this.state;

    const oldHits = page > 0 ? result.hits : [];

    const updatedHits = [...oldHits, ...newHits];

    this.setState({
      result: { hits: updatedHits, page }
    });
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
    const { result, searchTerm, searchKey } = this.state;

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={() => this.handleNewSearch()}
          >
            Search
          </Search>
        </div>
        {result && (
          <React.Fragment>
            <p>
              Search results: {searchKey} ({result.hits.length})
            </p>
            <Table
              list={result.hits}
              pattern={searchTerm}
              onDismiss={this.onDismiss}
            />
            <div className="interactions">
              <Button onClick={this.handleNextSearch}>
                More on {`'${searchKey}'`}
              </Button>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
