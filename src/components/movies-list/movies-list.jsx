import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

const MoviesList = (props) => {

  const {films, currentGenre, onFilmTitleClick, title, onFilmCardMouseEnter, onFilmCardMouseLeave} = props;

  const getFilmsByGenre = () => {
    if (currentGenre === `All genres`) {
      return films;
    }

    return films.filter((film) => film.genre === currentGenre);
  };

  return (
    <div className="catalog__movies-list">
      {getFilmsByGenre().map((film, index) => {
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
  currentGenre: PropTypes.string.isRequired,
  title: PropTypes.any,
  onFilmTitleClick: PropTypes.func.isRequired,
  onFilmCardMouseEnter: PropTypes.func.isRequired,
  onFilmCardMouseLeave: PropTypes.func.isRequired,
};

export default MoviesList;
