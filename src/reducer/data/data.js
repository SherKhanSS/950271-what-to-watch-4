import {extend} from "../../utils.js";
import {getAdaptedFilm} from "../../adapter/adapter.js";

const GENRE_DEFAULT = `All genres`;
const MAX_GENRES_LENGTH = 9;

const initialState = {
  films: null,
  promoFilm: null,
  genres: null,
  favoritesFilms: [],
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_GENRES: `LOAD_GENRES`,
  LOAD_FAVORITES_FILMS: `LOAD_FAVORITES_FILMS`,
  SET_FAVORITES_FILMS: `SET_FAVORITES_FILMS`,
};

const ActionCreator = {
  loadFilms: (movies) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: movies,
    };
  },

  loadPromoFilm: (movie) => {
    return {
      type: ActionType.LOAD_PROMO_FILM,
      payload: movie,
    };
  },

  loadGenres: (genres) => {
    return {
      type: ActionType.LOAD_GENRES,
      payload: genres,
    };
  },

  loadFavoritesFilms: (movies) => {
    return {
      type: ActionType.LOAD_FAVORITES_FILMS,
      payload: movies,
    };
  },

  setFavoritesFilms: (movies) => {
    return {
      type: ActionType.SET_FAVORITES_FILMS,
      payload: movies,
    };
  },
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const adaptedFilm = response.data.map((film) => getAdaptedFilm(film));
        dispatch(ActionCreator.loadFilms(adaptedFilm));
        dispatch(ActionCreator.loadGenres(
            [GENRE_DEFAULT, ...new Set(adaptedFilm.map((movie) => movie.genre)
              .slice(0, MAX_GENRES_LENGTH))])
        );
      });
  },

  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoFilm(getAdaptedFilm(response.data)));
      });
  },

  loadFavoritesFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavoritesFilms(response.data.map((film) => getAdaptedFilm(film))));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
      });

    case ActionType.LOAD_PROMO_FILM:
      return extend(state, {
        promoFilm: action.payload,
      });

    case ActionType.LOAD_GENRES:
      return extend(state, {
        genres: action.payload,
      });

    case ActionType.LOAD_FAVORITES_FILMS:
      return extend(state, {
        favoritesFilms: action.payload,
      });

    case ActionType.SET_FAVORITES_FILMS:
      return extend(state, {
        favoritesFilms: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
