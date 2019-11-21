// TODO: dismiss not working

import React from "react";

import { getHits } from "./services/hitsService";

import Button from "./components/Button";
import Search from "./components/Search";
import Table from "./components/Table";

import { isSearched, filterHitsWithNull } from "./helpers";

import "./App.css";

class App extends React.Component {
  state = { results: {}, searchTerm: "", searchKey: "", error: null };

  fetchHits = async (searchKey, page) => {
    try {
      const result = await getHits(searchKey, page);
      this.setSearchResult(searchKey, result);
    } catch (error) {
      this.setState({ error });
    }
  };

  handleNewSearch = () => {
    const { searchTerm, results } = this.state;

    if (!searchTerm) return;

    const isTermSearched = searchTerm in results;

    this.setState({ searchKey: searchTerm, searchTerm: "" });

    if (!isTermSearched) {
      this.fetchHits(searchTerm);
    }
  };

  handleNextSearch = () => {
    const {
      searchKey,
      results: {
        [searchKey]: { page }
      }
    } = this.state;

    this.fetchHits(searchKey, page + 1);
  };

  setSearchResult = (searchKey, result) =>
    this.setState(state => {
      const { results } = state;
      const { hits: newHits, page } = result;

      const isKeySearched = searchKey in results;

      const oldHits = isKeySearched ? results[searchKey].hits : [];

      const updatedHits = [...oldHits, ...filterHitsWithNull(newHits)];

      return {
        ...state,
        results: {
          ...state.results,
          [searchKey]: { hits: updatedHits, page }
        },
        error: null
      };
    });

  // state = {
  //   results: {
  //     react: {
  //       hits,
  //       page
  //     },
  //     php: {
  //       hits,
  //       page
  //     }
  //   },
  //   searchKey,
  //   error
  // }

  handleDismiss = id => {
    const isNotID = item => item.objectID !== id;

    this.setState(state => {
      const { results, searchKey } = state;
      const { hits } = results[searchKey];

      const updResult = {
        ...results[searchKey],
        hits: hits.filter(isNotID)
      };

      const updatedResults = {
        ...results,
        [searchKey]: updResult
      };

      return {
        ...state,
        results: updatedResults
      };
    });
  };

  onSearchChange = ({ target: { value } }) =>
    this.setState({ searchTerm: value });

  getFilteredHits = () => {
    const { results, searchKey, searchTerm } = this.state;
    const hits = results[searchKey] && results[searchKey].hits;
    return hits ? hits.filter(isSearched(searchTerm)) : null;
  };

  render() {
    const { searchKey, searchTerm, error } = this.state;

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
        <div className="interactions">
          {error && <p>Something went wrong ...</p>}
        </div>
        {hits && (
          <React.Fragment>
            <p>
              Search results: {searchKey} ({hits.length})
            </p>
            <Table list={hits} onDismiss={this.handleDismiss} />
            {hits.length > 0 && (
              <div className="interactions">
                <Button onClick={this.handleNextSearch}>
                  More on {`'${searchKey}'`}
                </Button>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
