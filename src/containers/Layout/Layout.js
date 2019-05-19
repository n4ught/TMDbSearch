import React, { Component } from "react";
import "./Layout.css";
import { BrowserRouter, Route } from "react-router-dom";

import Logo from "../../components/Logo/Logo";
import SearchBox from "../../components/SearchBox/SearchBox";
import Suggestions from "../../components/Suggestions/Suggestions";

import HomePage from "../HomePage/HomePage";

import axios from "axios";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBoxValue: "",
      typingTimer: "",
      searchResults: [],
      firstFiveSuggestions: []
    };
  }

  componentDidMount() {
    let self = this;

    // Fetch movie by query first
    // then use the id from the retrieved record
    // to query again for a complete movie details
    axios
      .get(
        "https://api.themoviedb.org/3/search/movie?api_key=c11f25007d9499120b5af944dce889c3&query=ocean%27s+eight"
      )
      .then(response => {
        axios
          .get(
            "https://api.themoviedb.org/3/movie/" +
              response.data.results[0].id +
              "?api_key=c11f25007d9499120b5af944dce889c3&append_to_response=videos"
          )
          .then(response => {
            self.setState({ searchResults: response.data });
          });
      });
  }

  formSubmissionHandler = event => {
    // Just to prevent the form from being submitted
    // when user hits the 'Enter' button.
    event.preventDefault();
  };

  searchBoxChangedHandler = event => {
    var self = this;
    var firstFiveResults = [];

    // Something related to synthetic event stuff.
    event.persist();

    // Set the state with the box's value.
    this.setState({
      searchBoxValue: event.target.value
    });

    //on keyup, start the countdown
    clearTimeout(this.state.typingTimer);

    if (event.target.value) {
      self.state.typingTimer = setTimeout(() => {
        axios
          .get(
            "https://api.themoviedb.org/3/search/movie?api_key=c11f25007d9499120b5af944dce889c3&query=" +
              this.state.searchBoxValue
          )
          .then(response => {
            // Get the first 5 results and asign the values to state.
            // *Bug - What if, results is less than 5??
            for (var i = 0; i < 5; i++) {
              firstFiveResults.push({
                id: response.data.results[i].id,
                title: response.data.results[i].title
              });
            }

            // Get the very first 5 results.
            self.setState({
              firstFiveSuggestions: firstFiveResults
            });
          });
      }, 2000);
    }
  };

  // When a suggestion item is clicked.
  suggestionClickedHandler = event => {
    event.preventDefault();
    event.persist();

    axios
      .get(
        "https://api.themoviedb.org/3/movie/" +
          event.target.getAttribute("data-id") +
          "?api_key=c11f25007d9499120b5af944dce889c3&append_to_response=videos"
      )
      .then(response => {
        this.setState({
          searchResults: response.data,
          searchBoxValue: event.target.innerHTML,
          // clear the first 5 suggestions
          firstFiveSuggestions: []
        });
      });

    // Clear the container
    var container = document.getElementsByClassName("suggestions-container");
    container[0].classList.remove("visible");
  };

  render() {
    var suggestions = this.state.firstFiveSuggestions;

    return (
      <div className="layout">
        <div className="logo-container">
          <Logo />
        </div>
        <div className="search-box-container">
          <SearchBox
            value={this.state.searchBoxValue}
            changedHandler={this.searchBoxChangedHandler}
            suggestions={suggestions}
            suggestionClicked={this.suggestionClickedHandler}
            formSubmission={this.formSubmissionHandler}
          />
        </div>
        <div className="movie-results-container">
          {/*<Route path="/" component={HomePage} /> */}
          <HomePage results={this.state.searchResults} />
        </div>
      </div>
    );
  }
}

export default Layout;
