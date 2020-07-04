import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullScreenVideoPlayer from "../full-screen-video-player/full-screen-video-player.jsx";
import withFullScreenVideoPlayer from "../../hocs/with-full-screen-video-player/with-full-screen-video-player.js";
const FullScreenVideoPlayerWrapped = withFullScreenVideoPlayer(FullScreenVideoPlayer);

class App extends PureComponent {
  _getFilmsByGenre() {
    const {films, currentGenre} = this.props;

    if (currentGenre === `All genres`) {
      return films;
    }

    return films.filter((film) => film.genre === currentGenre);
  }

  _renderApp() {
    const {films, genres, currentGenre, activeFilm, isPlayingFilm, filmsLength, onGenresItemClick, onFilmTitleClick, onShowMoreClick, onPlayButtonClick, onPlayerExitClick} = this.props;
    const film = films[0];

    if (activeFilm === null && !isPlayingFilm) {
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
        ? film : films.find((movie) => movie.title === activeFilm);

      return (
        <FullScreenVideoPlayerWrapped
          poster={currentFilm.poster}
          preview={currentFilm.preview}
          onPlayerExitClick={onPlayerExitClick}
        />
      );
    }

    return null;
  }

  _renderMoviePage() {
    const film = this.props.films[0];
    const {films, onFilmTitleClick, onPlayButtonClick} = this.props;

    return (
      <MoviePage
        film={film}
        films={films}
        onFilmTitleClick={onFilmTitleClick}
        onPlayButtonClick={onPlayButtonClick}
      />
    );
  }

  render() {
    const {onPlayerExitClick} = this.props;
    const {poster, preview} = this.props.films[1];

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
              preview={preview}
              onPlayerExitClick={onPlayerExitClick}
            />
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
  isPlayingFilm: PropTypes.bool,
  onGenresItemClick: PropTypes.func.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onPlayerExitClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
  films: state.films,
  activeFilm: state.activeFilm,
  isPlayingFilm: state.isPlayingFilm,
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
