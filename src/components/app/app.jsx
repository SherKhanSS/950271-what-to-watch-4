import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app-state/app-state.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullScreenVideoPlayer from "../full-screen-video-player/full-screen-video-player.jsx";
import withFullScreenVideoPlayer from "../../hocs/with-full-screen-video-player/with-full-screen-video-player.js";
import {getGenres, getPromoFilm, getFilmsByGenre} from "../../reducer/data/selectors.js";
import {getCurrentGenre, getFilmsLength} from "../../reducer/app-state/selectors.js";
import {getAuthorizationStatus, getOnReviewSuccess, getShowSendError, getFavoritesFilms, getReviews, getIsSent} from "../../reducer/user/selectors.js";
import {Operation as UserOperation, ActionCreator as UserActionCreator, AuthorizationStatus} from "../../reducer/user/user.js";
import Loader from "../loader/loader.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import history from "../../history.js";
import AddReview from "../add-review/add-review.jsx";
import MyList from "../my-list/my-list.jsx";
import PrivateRoute from "../private-route/private-route.jsx";

const FullScreenVideoPlayerWrapped = withFullScreenVideoPlayer(FullScreenVideoPlayer);

class App extends PureComponent {
  render() {
    const {
      films,
      promoFilm,
      reviews,
      genres,
      favoritesFilms,
      currentGenre,
      filmsLength,
      showSendError,
      onReviewSuccess,
      authorizationStatus,
      onGenresItemClick,
      onShowMoreClick,
      onPlayerExitClick,
      onAddButtonClick,
      login,
      sendReview,
      isSent,
      onFilmCardClick,
      onClosingReview,
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
              favoritesFilms={favoritesFilms}
              currentGenre={currentGenre}
              filmsLength={filmsLength}
              isAuthorized={authorizationStatus === AuthorizationStatus.AUTH}
              onGenresItemClick={onGenresItemClick}
              onShowMoreClick={onShowMoreClick}
              onAddButtonClick={onAddButtonClick}
              onFilmCardClick={onFilmCardClick}
            />
          </Route>
          <Route exact path="/login"
            render = {() => authorizationStatus === AuthorizationStatus.NO_AUTH
              ? <SignIn
                onSubmit={login}
              />
              : <Redirect to={`/`} /> }>
          </Route>
          <PrivateRoute
            exact path="/mylist"
            render={() => {
              return (
                <MyList
                  films={favoritesFilms}
                  onFilmCardClick={onFilmCardClick}
                />
              );
            }}
          />
          <Route exact path="/films/:id/review"
            render = {(props) => authorizationStatus === AuthorizationStatus.AUTH
              ? (
                <AddReview
                  {...props}
                  films={films}
                  showSendError={showSendError}
                  onReviewSuccess={onReviewSuccess}
                  isSent={isSent}
                  onSubmitReview={sendReview}
                  onClosingReview={onClosingReview}
                />
              )
              : <Redirect to={`/login`} />}>
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
                reviews={reviews}
                favoritesFilms={favoritesFilms}
                isAuthorized={authorizationStatus === AuthorizationStatus.AUTH}
                onAddButtonClick={onAddButtonClick}
                onFilmCardClick={onFilmCardClick}
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
  favoritesFilms: PropTypes.any,
  reviews: PropTypes.array,
  promoFilm: PropTypes.any,
  currentGenre: PropTypes.string,
  filmsLength: PropTypes.number.isRequired,
  isPlayingFilm: PropTypes.bool,
  authorizationStatus: PropTypes.string.isRequired,
  onGenresItemClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onPlayerExitClick: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  sendReview: PropTypes.func.isRequired,
  showSendError: PropTypes.bool.isRequired,
  onReviewSuccess: PropTypes.bool.isRequired,
  isSent: PropTypes.bool.isRequired,
  onFilmCardClick: PropTypes.func.isRequired,
  onClosingReview: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genres: getGenres(state),
  films: getFilmsByGenre(state),
  promoFilm: getPromoFilm(state),
  favoritesFilms: getFavoritesFilms(state),
  currentGenre: getCurrentGenre(state),
  filmsLength: getFilmsLength(state),
  authorizationStatus: getAuthorizationStatus(state),
  onReviewSuccess: getOnReviewSuccess(state),
  showSendError: getShowSendError(state),
  reviews: getReviews(state),
  isSent: getIsSent(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenresItemClick(genre) {
    dispatch(ActionCreator.changeCurrentGenre(genre));
    dispatch(ActionCreator.dropFilmsLength());
  },

  onShowMoreClick() {
    dispatch(ActionCreator.changeFilmsLength());
  },

  onPlayerExitClick() {
    dispatch(ActionCreator.dropIsPlayingFilm());
  },

  login(authData) {
    dispatch(UserOperation.login(authData));
  },

  sendReview(id, reviewData) {
    dispatch(UserOperation.sendReview(id, reviewData));
    dispatch(UserActionCreator.activateSent());
  },

  onAddButtonClick(id, status) {
    dispatch(UserOperation.addFilmsToFavorites(id, status));
  },

  onFilmCardClick(id) {
    dispatch(UserOperation.loadReview(id));
  },

  onClosingReview() {
    dispatch(UserActionCreator.setShowSendError(false));
    dispatch(UserActionCreator.sendReview(false));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
