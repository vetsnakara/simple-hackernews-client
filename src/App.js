// todo: refactor
// todo: add search no results

import React from "react";
import _ from "lodash";

import { getHits } from "./services/hitsService";

import Button from "./components/Button";
import Search from "./components/Search";
import Table from "./components/Table";
import WithLoading from "./components/WithLoading";

import { isSearched, getValidHits } from "./helpers";

import "./App.css";

class App extends React.Component {
  state = {
    results: {},
    searchTerm: "",
    searchKey: "",
    error: null,
    isLoading: false,
    sortColumn: { path: "title", order: "asc" }
  };

  columns = [
    {
      label: "Title",
      path: "title",
      content: item => (
        <a href={item.url} target="blank">
          {item.title}
        </a>
      ),
      width: "40%"
    },
    {
      label: "Author",
      path: "author",
      width: "30%"
    },
    {
      label: "Comments",
      path: "num_comments",
      width: "10%"
    },
    {
      label: "Points",
      path: "points",
      width: "10%"
    },
    {
      key: "dismiss",
      content: item => (
        <Button
          onClick={() => this.handleDismiss(item.objectID)}
          className="button-inline"
        >
          Dismiss
        </Button>
      ),
      width: "10%"
    }
  ];

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
      this.setState({ isLoading: true });
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

    this.setState({ isLoading: true });

    this.fetchHits(searchKey, page + 1);
  };

  setSearchResult = (searchKey, result) =>
    this.setState(state => {
      const { results } = state;
      const { hits: newHits, page } = result;

      const isKeySearched = searchKey in results;

      const oldHits = isKeySearched ? results[searchKey].hits : [];

      const updatedHits = [...oldHits, ...getValidHits(newHits)];

      return {
        ...state,
        results: {
          ...state.results,
          [searchKey]: { hits: updatedHits, page }
        },
        error: null,
        isLoading: false
      };
    });

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

  handleSort = sortColumn => this.setState({ sortColumn });

  getHits = () => {
    const { results, searchKey, searchTerm, sortColumn } = this.state;

    const hits = (results[searchKey] && results[searchKey].hits) || [];

    const sortedHits = this.sortItems(hits, sortColumn);

    const searchedHits = this.getSearchedItems(sortedHits, searchTerm);

    return searchedHits;
  };

  sortItems = (items, sortColumn) => {
    // todo: helper
    const { path, order } = sortColumn;
    const sorted = _.orderBy(items, [path], [order]);
    return sorted;
  };

  getSearchedItems(items, searchTerm) {
    // todo: helper
    return items.filter(isSearched(searchTerm));
  }

  render() {
    const { searchKey, searchTerm, error, isLoading, sortColumn } = this.state;

    const hits = this.getHits();

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={() => this.handleNewSearch()}
            isLoading={isLoading}
          />
        </div>

        {error && (
          <div className="interactions">
            <p>Something went wrong ...</p>
          </div>
        )}

        {hits.length > 0 && (
          <React.Fragment>
            <p>
              Search results: {searchKey} ({hits.length})
            </p>
            <Table
              columns={this.columns}
              items={hits}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />

            {hits.length > 0 && (
              <div className="interactions">
                <WithLoading isLoading={isLoading}>
                  <Button onClick={this.handleNextSearch}>
                    More on {`'${searchKey}'`}
                  </Button>
                </WithLoading>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
