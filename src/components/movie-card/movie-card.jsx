import React from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {

  const {title, poster, onFilmTitleClick, onFilmCardMouseEnter} = props;

  return (
    <article
      onMouseEnter={onFilmCardMouseEnter}
      onClick={(evt) => {
        evt.preventDefault();
        onFilmTitleClick(title);
      }}
      className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img
          src={poster}
          alt={title}
          width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
  onFilmCardMouseEnter: PropTypes.func.isRequired,
};

export default MovieCard;
