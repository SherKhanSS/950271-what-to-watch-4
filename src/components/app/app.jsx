import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app-state/app-state.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullScreenVideoPlayer from "../full-screen-video-player/full-screen-video-player.jsx";
import withFullScreenVideoPlayer from "../../hocs/with-full-screen-video-player/with-full-screen-video-player.js";
import {getGenres, getPromoFilm, getFilmsByGenre} from "../../reducer/data/selectors.js";
import {getCurrentGenre, getActiveFilm, getIsPlayingFilm, getFilmsLength} from "../../reducer/app-state/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import Loader from "../loader/loader.jsx";
import SignIn from "../sign-in/sign-in.jsx";

const FullScreenVideoPlayerWrapped = withFullScreenVideoPlayer(FullScreenVideoPlayer);

class App extends PureComponent {

  _renderApp() {
    const {
      films,
      promoFilm,
      genres,
      currentGenre,
      activeFilm,
      isPlayingFilm,
      filmsLength,
      authorizationStatus,
      onGenresItemClick,
      onFilmTitleClick,
      onShowMoreClick,
      onPlayButtonClick,
      onPlayerExitClick,
      login
    } = this.props;

    if (films === null || promoFilm === null || genres === null) {
      return (
        <Loader />
      );
    }

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return (
        <SignIn
          onSubmit={login}
        />
      );
    }

    if (activeFilm === null && !isPlayingFilm) {
      return (
        <Main
          film={promoFilm}
          films={films}
          genres={genres}
          currentGenre={currentGenre}
          filmsLength={filmsLength}
          isAuthorized={authorizationStatus === AuthorizationStatus.AUTH}
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
          film={films.find((movie) => movie.title === activeFilm)}
          films={films}
          onFilmTitleClick={onFilmTitleClick}
          onPlayButtonClick={onPlayButtonClick}
        />
      );
    }

    if (isPlayingFilm) {
      let currentFilm = activeFilm === null
        ? promoFilm : films.find((movie) => movie.title === activeFilm);

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
    const {films, genres, promoFilm, onFilmTitleClick, onPlayButtonClick} = this.props;

    if (films === null || promoFilm === null || genres === null) {
      return (
        <Loader />
      );
    }

    return (
      <MoviePage
        film={promoFilm}
        films={films}
        onFilmTitleClick={onFilmTitleClick}
        onPlayButtonClick={onPlayButtonClick}
      />
    );
  }

  render() {
    const {onPlayerExitClick, films, promoFilm, genres} = this.props;

    if (films === null || promoFilm === null || genres === null) {
      return (
        <Loader />
      );
    }

    const {poster, videoLink} = films[0];

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
  genres: PropTypes.any,
  films: PropTypes.any,
  promoFilm: PropTypes.any,
  currentGenre: PropTypes.string,
  activeFilm: PropTypes.any,
  filmsLength: PropTypes.number.isRequired,
  isPlayingFilm: PropTypes.bool,
  authorizationStatus: PropTypes.string.isRequired,
  onGenresItemClick: PropTypes.func.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onPlayerExitClick: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genres: getGenres(state),
  films: getFilmsByGenre(state),
  promoFilm: getPromoFilm(state),
  currentGenre: getCurrentGenre(state),
  activeFilm: getActiveFilm(state),
  isPlayingFilm: getIsPlayingFilm(state),
  filmsLength: getFilmsLength(state),
  authorizationStatus: getAuthorizationStatus(state),
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

  login(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
