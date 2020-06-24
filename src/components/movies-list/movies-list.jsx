import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

class MovieList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      poster: null,
    };
  }

  render() {
    const {films, onFilmTitleClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film, index) => {
          return (
            <MovieCard
              title={film.title}
              poster={film.poster}
              preview={film.preview}
              onFilmTitleClick={onFilmTitleClick}
              onFilmCardMouseEnter={() => {
                this.setState({
                  title: film.title,
                  poster: film.poster,
                });
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

