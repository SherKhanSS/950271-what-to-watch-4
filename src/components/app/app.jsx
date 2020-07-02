import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

class App extends PureComponent {
  _getFilmsByGenre() {
    const {films, currentGenre} = this.props;

    if (currentGenre === `All genres`) {
      return films;
    }

    return films.filter((film) => film.genre === currentGenre);
  }

  _renderApp() {
    const {films, genres, currentGenre, activeFilm, filmsLength, onGenresItemClick, onFilmTitleClick, onShowMoreClick} = this.props;
    const film = films[0];

    if (activeFilm === null) {
      return (
        <Main
          film={film}
          films={this._getFilmsByGenre()}
          genres={genres}
          currentGenre={currentGenre}
          filmsLength={filmsLength}
          onGenresItemClick={onGenresItemClick}
          onFilmTitleClick={onFilmTitleClick}
          onShowMoreClick={onShowMoreClick}
        />
      );
    }

    if (activeFilm) {
      return (
        <MoviePage
          film={films.find((movie) => movie.title === activeFilm)}
          films={films}
          onFilmTitleClick={onFilmTitleClick}
        />
      );
    }

    return null;
  }

  _renderMoviePage() {
    const film = this.props.films[0];
    const {films, onFilmTitleClick} = this.props;

    return (
      <MoviePage
        film={film}
        films={films}
        onFilmTitleClick={onFilmTitleClick}
      />
    );
  }

  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            {this._renderMoviePage()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  films: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
  currentGenre: PropTypes.string,
  activeFilm: PropTypes.any,
  filmsLength: PropTypes.number.isRequired,
  onGenresItemClick: PropTypes.func.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
  films: state.films,
  activeFilm: state.activeFilm,
  genres: state.genres,
  filmsLength: state.filmsLength,
});

const mapDispatchToProps = (dispatch) => ({
  onGenresItemClick(genre) {
    dispatch(ActionCreator.changeCurrentGenre(genre));
    dispatch(ActionCreator.dropFilmsLength());
  },

  onFilmTitleClick(filmTitle) {
    dispatch(ActionCreator.changeActiveFilm(filmTitle));
  },

  onShowMoreClick() {
    dispatch(ActionCreator.changeFilmsLength());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
