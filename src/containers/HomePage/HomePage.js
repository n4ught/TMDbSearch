import React, { Component } from "react";
import "./HomePage.css";

import Movie from "../../components/Movie/Movie";

class HomePage extends Component {
  render() {
    return (
      <div className="homepage-container">
        <Movie details={this.props.results} />
      </div>
    );
  }
}

export default HomePage;
