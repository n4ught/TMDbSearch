import React from "react";

import "./Movie.css";

function setBackground(imagePath) {
  return (document.getElementsByTagName("body")[0].style.backgroundImage =
    "url(https://image.tmdb.org/t/p/original" + imagePath + ")");
}

const movie = props => {
  // Sets the background image.
  setBackground(props.details.backdrop_path);

  var genres, productionCompanies;

  // Change the background of the page.
  // When component mounts, there are no values to map yet
  // so we have to check if genres is defined before we map it.
  if (props.details.genres !== undefined) {
    genres = props.details.genres
      .map(function(genre) {
        return genre.name;
      })
      .join(", ");
  }

  if (props.details.production_companies !== undefined) {
    productionCompanies = props.details.production_companies
      .map(company => {
        return company.name;
      })
      .join(", ");
  }

  var revenue = parseFloat(props.details.revenue).toLocaleString("en");

  // if (props.details.genres !== undefined || props.details.genres.length > 0) {
  //   var genres = props.details.genres.map(function(genre) {
  //     return genre.name;
  //   });
  // }

  // const genresCollection = props.details.genres;
  // const genres = genresCollection.map(function(genre) {
  //   return genre.name;
  // });

  return (
    <div className="movie-container">
      <div className="movie-cover">
        <img
          src={"https://image.tmdb.org/t/p/w500" + props.details.poster_path}
          alt="Movie poster."
        />
      </div>
      <div className="movie-details">
        <h1 className="title">{props.details.title}</h1>
        <h3 className="tagline">{props.details.tagline}</h3>
        <p className="overview">{props.details.overview}</p>
        <div className="genres">{genres}</div>
        <div className="production-companies">{productionCompanies}</div>
        <div className="movie-data-grid">
          <div>
            <p>Original Release:</p>
            <p className="release-date">{props.details.release_date}</p>
          </div>
          <div>
            <p>Running Time:</p>
            <p className="runtime">{props.details.runtime} mins.</p>
          </div>
          <div>
            <p>Box Office:</p>
            <p className="revenue">${revenue}</p>
          </div>
          <div>
            <p>Vote Average:</p>
            <p className="vote-average">{props.details.vote_average} / 10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default movie;
