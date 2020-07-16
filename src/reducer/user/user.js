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
  favoritesFilms: [`foo`],
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SEND_REVIEW: `SEND_REVIEW`,
  SET_SHOW_SEND_ERROR: `SET_SHOW_SEND_ERROR`,
  LOAD_FAVORITES_FILMS: `LOAD_FAVORITES_FILMS`,
  ADD_FAVORITES_FILM: `ADD_FAVORITES_FILM`,
  DELETE_FAVORITES_FILM: `DELETE_FAVORITES_FILM`,
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

  sendReview: (reviewData) => (dispatch, getState, api) => {
    return api.post(`/comments/1`, {
      rating: reviewData.rating,
      comment: reviewData.comment,
    })
      .then(() => {
        dispatch(ActionCreator.sendReview(true));
      })
      .catch((err) => {
        dispatch(ActionCreator.setShowSendError(true));
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
        if (film) {
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

    case ActionType.SET_SHOW_SEND_ERROR:
      return extend(state, {
        showSendError: action.payload,
      });

    case ActionType.LOAD_FAVORITES_FILMS:
      return extend(state, {
        favoritesFilms: action.payload,
      });

    case ActionType.SET_FAVORITES_FILMS:
      return extend(state, {
        favoritesFilms: action.payload,
      });


    case ActionType.ADD_FAVORITES_FILM:
      return extend(state, {
        favoritesFilms: [...state.favoritesFilms].push(action.payload),
      });

    case ActionType.DELETE_FAVORITES_FILM:
      return extend(state, {
        favoritesFilms: [...state.favoritesFilms].filter((movie) => movie !== action.payload),
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, AuthorizationStatus, Operation};
