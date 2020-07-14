import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app-state/app-state.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullScreenVideoPlayer from "../full-screen-video-player/full-screen-video-player.jsx";
import withFullScreenVideoPlayer from "../../hocs/with-full-screen-video-player/with-full-screen-video-player.js";
import {getGenres, getPromoFilm, getFilmsByGenre} from "../../reducer/data/selectors.js";
import {getCurrentGenre, getFilmsLength, getFilmsAddedToWatch} from "../../reducer/app-state/selectors.js";
import {getAuthorizationStatus, getShowSendError} from "../../reducer/user/selectors.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import Loader from "../loader/loader.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import history from "../../history.js";
import AddReview from "../add-review/add-review.jsx";
import MyList from "../my-list/my-list.jsx";

const FullScreenVideoPlayerWrapped = withFullScreenVideoPlayer(FullScreenVideoPlayer);

class App extends PureComponent {
  render() {
    const {
      films,
      promoFilm,
      genres,
      currentGenre,
      filmsLength,
      showSendError,
      authorizationStatus,
      filmsAddedToWatch,
      onGenresItemClick,
      onFilmTitleClick,
      onShowMoreClick,
      onPlayerExitClick,
      onAddButtonClick,
      login,
      sendReview
    } = this.props;

    if (films === null || promoFilm === null || genres === null) {
      return (
        <Loader />
      );
    }

    return (
      <Router
        history={history}
      >
        <Switch>
          <Route exact path="/">
            <Main
              film={promoFilm}
              films={films}
              genres={genres}
              currentGenre={currentGenre}
              filmsLength={filmsLength}
              isAuthorized={authorizationStatus === AuthorizationStatus.AUTH}
              filmsAddedToWatch={filmsAddedToWatch}
              onGenresItemClick={onGenresItemClick}
              onFilmTitleClick={onFilmTitleClick}
              onShowMoreClick={onShowMoreClick}
              onAddButtonClick={onAddButtonClick}
            />
          </Route>
          <Route exact path="/login"
            render = {() => authorizationStatus === AuthorizationStatus.NO_AUTH
              ? <SignIn
                onSubmit={login}
              />
              : history.goBack() }>
          </Route>
          <Route exact path="/mylist">
            <MyList
              films={films}
              onFilmTitleClick={onFilmTitleClick}
            />
          </Route>
          <Route exact path="/films/:id/review"
            render = {(props) => (
              <AddReview
                {...props}
                films={films}
                showSendError={showSendError}
                onSubmitReview={sendReview}
              />
            )}>
          </Route>
          <Route exact path="/films/:id/player"
            render = {(props) => (
              <FullScreenVideoPlayerWrapped
                {...props}
                films={films}
                onPlayerExitClick={onPlayerExitClick}
              />
            )}>
          </Route>
          <Route exact path="/films/:id"
            render = {(props) => (
              <MoviePage
                {...props}
                films={films}
                isAuthorized={authorizationStatus === AuthorizationStatus.AUTH}
                onFilmTitleClick={onFilmTitleClick}
              />
            )}>
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  genres: PropTypes.any,
  films: PropTypes.any,
  promoFilm: PropTypes.any,
  currentGenre: PropTypes.string,
  filmsLength: PropTypes.number.isRequired,
  isPlayingFilm: PropTypes.bool,
  authorizationStatus: PropTypes.string.isRequired,
  onGenresItemClick: PropTypes.func.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onPlayerExitClick: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  sendReview: PropTypes.func.isRequired,
  showSendError: PropTypes.bool.isRequired,
  filmsAddedToWatch: PropTypes.object,
};

const mapStateToProps = (state) => ({
  genres: getGenres(state),
  films: getFilmsByGenre(state),
  promoFilm: getPromoFilm(state),
  currentGenre: getCurrentGenre(state),
  filmsLength: getFilmsLength(state),
  authorizationStatus: getAuthorizationStatus(state),
  showSendError: getShowSendError(state),
  filmsAddedToWatch: getFilmsAddedToWatch(state),
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

  onAddButtonClick(list) {
    dispatch(ActionCreator.setFilmsAddedToWatch(list));
  },

  login(authData) {
    dispatch(UserOperation.login(authData));
  },

  sendReview(reviewData) {
    dispatch(UserOperation.sendReview(reviewData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
