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
    const {films, currentGenre, onFilmTitleClick} = this.props;
    const PLAY_DELAY = 1000;

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
              isPlaying={this.state.title === film.title}
              onFilmTitleClick={onFilmTitleClick}
              onFilmCardMouseEnter={() => {
                const timer = setTimeout(() => {
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
                const {timerId} = this.state;
                clearTimeout(timerId);
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
  currentGenre: PropTypes.string.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
};

export default MovieList;

