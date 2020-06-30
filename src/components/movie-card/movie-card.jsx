import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

const MovieCard = (props) => {
  const {title, poster, preview, isPlaying, onFilmTitleClick, onFilmCardMouseEnter, onFilmCardMouseLeave} = props;

  return (
    <article
      onMouseEnter={onFilmCardMouseEnter(title, poster)}
      onMouseLeave={onFilmCardMouseLeave}
      className="small-movie-card catalog__movies-card">
      <div
        onClick={() => {
          onFilmTitleClick(title);
        }}
        className="small-movie-card__image">
        {isPlaying ? (
          <VideoPlayer
            poster={poster}
            preview={preview}
          />
        ) : (
          <img
            src={poster}
            alt={title}
            width="280" height="175" />
        )}
      </div>
      <h3
        onClick={(evt) => {
          evt.preventDefault();
          onFilmTitleClick(title);
        }}
        className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};


MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
  onFilmCardMouseEnter: PropTypes.func.isRequired,
  onFilmCardMouseLeave: PropTypes.func.isRequired,
};

export default MovieCard;
