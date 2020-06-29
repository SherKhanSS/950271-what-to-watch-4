import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

class App extends PureComponent {
  _renderApp() {
    const {films, genres, curretGenre, activeFilm, onGenresItemClick, onFilmTitleClick} = this.props;
    const film = films[0];

    if (activeFilm === null) {
      return (
        <Main
          film={film}
          films={films.slice(0, 8)}
          genres={genres}
          currentGenre={curretGenre}
          onGenresItemClick={onGenresItemClick}
          onFilmTitleClick={onFilmTitleClick}
        />
      );
    }

    if (activeFilm) {
      return (
        <MoviePage
          film={films.find((movie) => movie.title === activeFilm)}
        />
      );
    }

    return null;
  }

  _renderMoviePage() {
    const film = this.props.films[0];

    return (
      <MoviePage
        film={film}
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
  curretGenre: PropTypes.string.isRequired,
  activeFilm: PropTypes.any,
  onGenresItemClick: PropTypes.func.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  curretGenre: state.curretGenre,
  films: state.films,
  activeFilm: state.activeFilm,
  genres: state.genres,
});

const mapDispatchToProps = (dispatch) => ({
  onGenresItemClick(genre) {
    dispatch(ActionCreator.changeCurrentGenre(genre));
  },

  onFilmTitleClick(filmTitle) {
    dispatch(ActionCreator.changeActiveFilm(filmTitle));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
