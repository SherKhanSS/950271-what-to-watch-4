import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };
  }

  render() {
    const {title, poster, preview, onFilmTitleClick, onFilmCardMouseEnter} = this.props;
    const PLAY_DELAY = 1000;
    let timerId = null;

    const videoPlay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    const videoStop = () => {
      this.setState({
        isPlaying: false,
      });
    };

    return (
      <article
        onMouseEnter={() => {
          onFilmCardMouseEnter();
          // без вызова этого колбека onFilmCardMouseEnter() из пропсов
          // все работает как ожидается, с ним же начинают происходить траблы,
          // значение state isPlaying не всегда сбрасывается в false,
          // особенно если начать выодить мышью по всем карточкам.
          // Почему - не понял
          timerId = setTimeout(videoPlay, PLAY_DELAY);
        }}
        onMouseLeave={() => {
          clearTimeout(timerId);
          videoStop();
        }}
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
            isPlaying={this.state.isPlaying}
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
  }
}


MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
  onFilmCardMouseEnter: PropTypes.func.isRequired,
};

export default MovieCard;
