import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

const MoviesList = (props) => {

  const {films, title, onFilmCardMouseEnter, onFilmCardMouseLeave, onFilmCardClick} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film, index) => {
        return (
          <MovieCard
            title={film.title}
            poster={film.previewImage}
            preview={film.preview}
            id={film.id}
            isPlaying={title === film.title}
            onFilmCardMouseEnter={onFilmCardMouseEnter}
            onFilmCardMouseLeave={onFilmCardMouseLeave}
            onFilmCardClick={onFilmCardClick}
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
  onFilmCardMouseEnter: PropTypes.func.isRequired,
  onFilmCardMouseLeave: PropTypes.func.isRequired,
  onFilmCardClick: PropTypes.func.isRequired,
};

export default MoviesList;
