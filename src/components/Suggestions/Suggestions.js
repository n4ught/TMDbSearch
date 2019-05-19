import React from "react";

import Suggestion from "./Suggestion/Suggestion";
import "./Suggestions.css";

const suggestions = props => {
  var suggestions, elementClasses;

  // loop through suggestions props.
  if (props.data.length > 0) {
    // Add class visible if there are suggestions

    elementClasses = "visible";
    suggestions = props.data.map(suggestion => {
      return (
        <Suggestion
          data={suggestion}
          clicked={props.clicked}
          key={suggestion.id}
        />
      );
    });
  }

  return (
    <div className={"suggestions-container " + elementClasses}>
      <ul>{suggestions}</ul>
    </div>
  );
};

export default suggestions;
