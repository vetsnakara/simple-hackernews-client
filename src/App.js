// новый поиск
//  1. setState({searchKey: searchTerm})
//  2. searchTerm in results
//     2.1 Нет:
//         - fetchResults(searchTerm)
// продолжение поиска
//  1. page = this.state.results[searchKey].page
//  2.fetchResults(searchKey, page + 1)

import React from "react";

import Button from "./components/Button";
import Search from "./components/Search";
import Table from "./components/Table";

import { url } from "./constants";
import { isSearched } from "./helpers";

import "./App.css";

class App extends React.Component {
  state = { results: {}, searchTerm: "", searchKey: "" };

  fetchStories = (searchKey, page) => {
    const searchUrl = url(searchKey, page);

    fetch(searchUrl)
      .then(response => response.json())
      .then(result => this.setSearchResult(searchKey, result))
      .catch(error => console.log(error));
  };

  handleNewSearch = () => {
    const { searchTerm, results } = this.state;

    if (!searchTerm) return;

    const isTermSearched = searchTerm in results;

    this.setState({ searchKey: searchTerm, searchTerm: "" });

    if (!isTermSearched) {
      this.fetchStories(searchTerm);
    }
  };

  handleNextSearch = () => {
    const {
      searchKey,
      results: {
        [searchKey]: { page }
      }
    } = this.state;

    this.fetchStories(searchKey, page + 1);
  };

  setSearchResult = (searchKey, result) =>
    this.setState(state => {
      const { results } = state;
      const { hits: newHits, page } = result;

      const isKeySearched = searchKey in results;

      const oldHits = isKeySearched ? results[searchKey].hits : [];

      const updatedHits = [...oldHits, ...newHits];

      return {
        ...state,
        results: {
          ...state.results,
          [searchKey]: { hits: updatedHits, page }
        }
      };
    });

  onDismiss = id => {
    const isNotID = item => item.objectID !== id;
    this.setState(({ result }) => ({
      result: { ...result, hits: result.hits.filter(isNotID) }
    }));
  };

  onSearchChange = ({ target: { value } }) =>
    this.setState({ searchTerm: value });

  getFilteredHits = () => {
    const { results, searchKey, searchTerm } = this.state;
    const hits = (results[searchKey] && results[searchKey].hits) || [];
    return hits.filter(isSearched(searchTerm));
  };

  render() {
    const { searchKey, searchTerm } = this.state;
    const hits = this.getFilteredHits();

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
        {hits.length > 0 && (
          <React.Fragment>
            <p>
              Search results: {searchKey} ({hits.length})
            </p>
            <Table list={hits} onDismiss={this.onDismiss} />
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
