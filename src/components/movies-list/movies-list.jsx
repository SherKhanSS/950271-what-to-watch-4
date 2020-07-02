import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

const MoviesList = (props) => {

  const {films, onFilmTitleClick, title, onFilmCardMouseEnter, onFilmCardMouseLeave} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film, index) => {
        return (
          <MovieCard
            title={film.title}
            poster={film.poster}
            preview={film.preview}
            isPlaying={title === film.title}
            onFilmTitleClick={onFilmTitleClick}
            onFilmCardMouseEnter={onFilmCardMouseEnter}
            onFilmCardMouseLeave={onFilmCardMouseLeave}
            key={film.title + index}
          />
        );
      })}
    </div>
  );
};

MoviesList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.any,
  onFilmTitleClick: PropTypes.func.isRequired,
  onFilmCardMouseEnter: PropTypes.func.isRequired,
  onFilmCardMouseLeave: PropTypes.func.isRequired,
};

export default MoviesList;
