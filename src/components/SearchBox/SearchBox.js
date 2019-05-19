import React from "react";
import "./SearchBox.css";

import Suggestions from "../Suggestions/Suggestions";

const searchBox = props => {
  var suggestions = (
    <Suggestions data={props.suggestions} clicked={props.suggestionClicked} />
  );

  return (
    <div className="search-box-form-container">
      <form
        onSubmit={event => {
          props.formSubmission(event);
        }}
      >
        <input
          type="text"
          placeholder="Search a movie title..."
          value={props.value}
          className="search-box"
          onChange={event => props.changedHandler(event)}
        />
      </form>
      {suggestions}
    </div>
  );
};

export default searchBox;
