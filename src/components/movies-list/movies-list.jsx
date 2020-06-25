import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

class MovieList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      poster: null,
      timerId: null,
    };
  }

  render() {
    const {films, onFilmTitleClick} = this.props;
    const PLAY_DELAY = 1000;
    let timer = null;

    return (
      <div className="catalog__movies-list">
        {films.map((film, index) => {
          return (
            <MovieCard
              title={film.title}
              poster={film.poster}
              preview={film.preview}
              isPlaying={this.state.title === film.title}
              onFilmTitleClick={onFilmTitleClick}
              onFilmCardMouseEnter={() => {
                timer = setTimeout(() => {
                  this.setState({
                    title: film.title,
                    poster: film.poster,
                  });
                }, PLAY_DELAY);
                this.setState({
                  timerId: timer,
                });
              }}
              onFilmCardMouseLeave={() => {
                this.setState({
                  title: null,
                  poster: null,
                  timerId: null,
                });
                clearTimeout(timer);
              }}
              key={film.title + index}
            />
          );
        })}
      </div>
    );
  }
}

MovieList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
};

export default MovieList;

