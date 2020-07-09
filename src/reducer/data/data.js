import {extend} from "../../utils.js";
import {getAdaptedFilm} from "../../adapter/adapter.js";

const GENRE_DEFAULT = `All genres`;
const MAX_GENRES_LENGTH = 9;

const initialState = {
  films: null,
  promoFilm: null,
  genres: null,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_GENRES: `LOAD_GENRES`,
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
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data.map((film) => getAdaptedFilm(film))));
        dispatch(ActionCreator.loadGenres(
            [GENRE_DEFAULT, ...new Set(response.data.map((film) => getAdaptedFilm(film)).map((movie) => movie.genre)
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
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
