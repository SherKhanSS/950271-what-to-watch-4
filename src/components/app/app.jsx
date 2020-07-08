import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app-state/app-state.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullScreenVideoPlayer from "../full-screen-video-player/full-screen-video-player.jsx";
import withFullScreenVideoPlayer from "../../hocs/with-full-screen-video-player/with-full-screen-video-player.js";
import {getAdaptedFilm} from "../../adapter/adapter.js";
import {getFilms, getPromoFilm} from "../../reducer/data/selectors.js";
import {getCurrentGenre, getActiveFilm, getIsPlayingFilm, getFilmsLength} from "../../reducer/app-state/selectors.js";
import Loader from "../loader/loader.jsx";

const FullScreenVideoPlayerWrapped = withFullScreenVideoPlayer(FullScreenVideoPlayer);

class App extends PureComponent {
  _getFilmsByGenre(films, currentGenre) {

    if (currentGenre === `All genres`) {
      return films;
    }

    return films.filter((film) => film.genre === currentGenre);
  }

  _renderApp() {
    const {films, promoFilm, currentGenre, activeFilm, isPlayingFilm, filmsLength, onGenresItemClick, onFilmTitleClick, onShowMoreClick, onPlayButtonClick, onPlayerExitClick} = this.props;

    const GENRE_DEFAULT = `All genres`;
    const MAX_GENRES_LENGTH = 9;

    if (films === null || promoFilm === null) {
      return (
        <Loader />
      );
    }

    let adaptedFilms = films.map((film) => getAdaptedFilm(film));
    let adaptedPromoFilm = getAdaptedFilm(promoFilm);

    if (activeFilm === null && !isPlayingFilm) {
      return (
        <Main
          film={adaptedPromoFilm}
          films={this._getFilmsByGenre(adaptedFilms, currentGenre)
          }
          genres={[GENRE_DEFAULT, ...new Set(adaptedFilms.map((movie) => movie.genre).slice(0, MAX_GENRES_LENGTH))]}
          currentGenre={currentGenre}
          filmsLength={filmsLength}
          onGenresItemClick={onGenresItemClick}
          onFilmTitleClick={onFilmTitleClick}
          onShowMoreClick={onShowMoreClick}
          onPlayButtonClick={onPlayButtonClick}
        />
      );
    }

    if (activeFilm && !isPlayingFilm) {
      return (
        <MoviePage
          film={adaptedFilms.find((movie) => movie.title === activeFilm)}
          films={adaptedFilms}
          onFilmTitleClick={onFilmTitleClick}
          onPlayButtonClick={onPlayButtonClick}
        />
      );
    }

    if (isPlayingFilm) {
      let currentFilm = activeFilm === null
        ? adaptedPromoFilm : adaptedFilms.find((movie) => movie.title === activeFilm);

      return (
        <FullScreenVideoPlayerWrapped
          poster={currentFilm.poster}
          videoLink={currentFilm.videoLink}
          onPlayerExitClick={onPlayerExitClick}
        />
      );
    }

    return null;
  }

  _renderMoviePage() {
    const {films, onFilmTitleClick, onPlayButtonClick} = this.props;

    if (films === null) {
      return (
        <Loader />
      );
    }

    let adaptedFilms = films.map((film) => getAdaptedFilm(film));
    let film = adaptedFilms[0];

    return (
      <MoviePage
        film={film}
        films={adaptedFilms}
        onFilmTitleClick={onFilmTitleClick}
        onPlayButtonClick={onPlayButtonClick}
      />
    );
  }

  render() {
    const {onPlayerExitClick, films} = this.props;

    if (films === null) {
      return (
        <Loader />
      );
    }

    let adaptedFilms = films.map((film) => getAdaptedFilm(film));
    let film = adaptedFilms[0];

    const {poster, videoLink} = film;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            {this._renderMoviePage()}
          </Route>
          <Route exact path="/dev-player">
            <FullScreenVideoPlayerWrapped
              poster={poster}
              videoLink={videoLink}
              onPlayerExitClick={onPlayerExitClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  films: PropTypes.any,
  promoFilm: PropTypes.any,
  currentGenre: PropTypes.string,
  activeFilm: PropTypes.any,
  filmsLength: PropTypes.number.isRequired,
  isPlayingFilm: PropTypes.bool,
  onGenresItemClick: PropTypes.func.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onPlayerExitClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  promoFilm: getPromoFilm(state),
  currentGenre: getCurrentGenre(state),
  activeFilm: getActiveFilm(state),
  isPlayingFilm: getIsPlayingFilm(state),
  filmsLength: getFilmsLength(state),
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
  },

  onPlayerExitClick() {
    dispatch(ActionCreator.dropIsPlayingFilm());
  },

  onPlayButtonClick() {
    dispatch(ActionCreator.activatePlayingFilm());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
