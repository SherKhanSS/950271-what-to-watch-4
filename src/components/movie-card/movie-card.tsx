import * as React from "react";
import VideoPlayer from "../video-player/video-player";
import history from "../../history";

interface Props {
  title: string;
  poster: string;
  preview: string;
  id: number;
  isPlaying: boolean;
  onFilmCardMouseEnter: (title: string, poster: string) => void;
  onFilmCardMouseLeave: () => void;
  onFilmCardClick: (id: number) => void;
}

class MovieCard extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const {title, poster, preview, id, isPlaying, onFilmCardMouseEnter, onFilmCardMouseLeave, onFilmCardClick} = this.props;

    return (
      <article
        onMouseEnter={() => {
          onFilmCardMouseEnter(title, poster);
        }
        }
        onMouseLeave={onFilmCardMouseLeave}
        className="small-movie-card catalog__movies-card">
        <div
          onClick={() => {
            history.push(`/films/${id}`);
            onFilmCardClick(id);
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
            history.push(`/films/${id}`);
            onFilmCardClick(id);
          }}
          className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{title}</a>
        </h3>
      </article>
    );
  }
}

export default MovieCard;
