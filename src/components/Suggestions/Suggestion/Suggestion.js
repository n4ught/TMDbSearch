import React from "react";

import "./Suggestion.css";

const suggestion = props => {
  return (
    <li className="suggestion-item">
      <a
        href="#"
        className="suggestion-link"
        data-id={props.data.id}
        onClick={event => props.clicked(event)}
      >
        {props.data.title}
      </a>
    </li>
  );
};

export default suggestion;
