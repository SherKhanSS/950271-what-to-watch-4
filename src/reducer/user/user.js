import {extend} from "../../utils.js";
import {getAdaptedFilm} from "../../adapter/adapter.js";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  onReviewSuccess: false,
  showSendError: false,
  isSent: false,
  favoritesFilms: [],
  reviews: [],
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOAD_REVIEV: `LOAD_REVIEV`,
  SEND_REVIEW: `SEND_REVIEW`,
  SET_SHOW_SEND_ERROR: `SET_SHOW_SEND_ERROR`,
  LOAD_FAVORITES_FILMS: `LOAD_FAVORITES_FILMS`,
  ADD_FAVORITES_FILM: `ADD_FAVORITES_FILM`,
  DELETE_FAVORITES_FILM: `DELETE_FAVORITES_FILM`,
  ACTIVATE_SENT: `ACTIVATE_SENT`,
  DEACTIVATE_SENT: `DEACTIVATE_SENT`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  sendReview: (status) => {
    return {
      type: ActionType.SEND_REVIEW,
      payload: status,
    };
  },

  loadReview: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEV,
      payload: reviews,
    };
  },

  setShowSendError: (status) => {
    return {
      type: ActionType.SET_SHOW_SEND_ERROR,
      payload: status,
    };
  },

  loadFavoritesFilms: (movies) => {
    return {
      type: ActionType.LOAD_FAVORITES_FILMS,
      payload: movies,
    };
  },

  addFavoritesFilm: (movie) => {
    return {
      type: ActionType.ADD_FAVORITES_FILM,
      payload: movie,
    };
  },

  deleteFavoritesFilm: (movie) => {
    return {
      type: ActionType.DELETE_FAVORITES_FILM,
      payload: movie,
    };
  },

  activateSent: () => {
    return {
      type: ActionType.ACTIVATE_SENT,
      payload: true,
    };
  },

  deactivateSent: () => {
    return {
      type: ActionType.DEACTIVATE_SENT,
      payload: false,
    };
  },
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      });
  },

  loadReview: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadReview(response.data));
      })
      .catch((err) => {
        throw err;
      });
  },

  sendReview: (id, reviewData) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, {
      rating: reviewData.rating,
      comment: reviewData.comment,
    })
      .then(() => {
        dispatch(ActionCreator.sendReview(true));
        dispatch(ActionCreator.deactivateSent());
      })
      .catch((err) => {
        dispatch(ActionCreator.setShowSendError(true));
        dispatch(ActionCreator.deactivateSent());
        throw err;
      });
  },

  loadFavoritesFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavoritesFilms(response.data.map((film) => getAdaptedFilm(film))));
      });
  },

  addFilmsToFavorites: (id, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${status}`)
      .then((response) => {
        const film = getAdaptedFilm(response.data);
        if (film.isFavorite) {
          dispatch(ActionCreator.addFavoritesFilm(film));
        } else {
          dispatch(ActionCreator.deleteFavoritesFilm(film));
        }
      })
      .catch((err) => {
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });

    case ActionType.SEND_REVIEW:
      return extend(state, {
        onReviewSuccess: action.payload,
      });

    case ActionType.LOAD_REVIEV:
      return extend(state, {
        reviews: action.payload,
      });

    case ActionType.SET_SHOW_SEND_ERROR:
      return extend(state, {
        showSendError: action.payload,
      });

    case ActionType.LOAD_FAVORITES_FILMS:
      return extend(state, {
        favoritesFilms: action.payload,
      });

    case ActionType.ADD_FAVORITES_FILM:
      return extend(state, {
        favoritesFilms: [...state.favoritesFilms, action.payload],
      });

    case ActionType.DELETE_FAVORITES_FILM:
      return extend(state, {
        favoritesFilms: [...state.favoritesFilms].filter((movie) => movie.id !== action.payload.id),
      });

    case ActionType.ACTIVATE_SENT:
      return extend(state, {
        isSent: action.payload,
      });

    case ActionType.DEACTIVATE_SENT:
      return extend(state, {
        isSent: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, AuthorizationStatus, Operation};
