import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

const MovieCard = (props) => {

  const {title, poster, preview, onFilmTitleClick, onFilmCardMouseEnter} = props;

  return (
    <article
      onMouseEnter={onFilmCardMouseEnter}
      className="small-movie-card catalog__movies-card">
      <div
        onClick={() => {
          onFilmTitleClick(title);
        }}
        className="small-movie-card__image">
        {/* <img
          src={poster}
          alt={title}
          width="280" height="175" /> */}
        <VideoPlayer
          poster={poster}
          preview={preview}
        />
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
  preview: PropTypes.string,
  onFilmTitleClick: PropTypes.func.isRequired,
  onFilmCardMouseEnter: PropTypes.func.isRequired,
};

export default MovieCard;
