import {films} from "./mocks/films.js";

const MAX_GENRE_LENGHT = 9;
const GENRE_DEFAULT = `All genres`;

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const genres = [GENRE_DEFAULT, ...new Set(films.map((film) => film.genre).slice(0, MAX_GENRE_LENGHT))];

const initialState = {
  genre: GENRE_DEFAULT,
  activeFilm: null,
  films,
  genres,
};

const ActionType = {
  CHANGE_FILTER_BY_GENRE: `CHANGE_FILTER_BY_GENRE`,
  GET_MOVIE_LIST: `GET_MOVIE_LIST`,
  GET_ACTIVE_FILM: `GET_ACTIVE_FILM`,
};

const ActionCreator = {
  changCurrentGenre: (genre) => ({
    type: ActionType.CHANGE_FILTER_BY_GENRE,
    payload: genre,
  }),

  getFilms: (genre) => ({
    type: ActionType.GET_MOVIE_LIST,
    payload: genre,
  }),

  changActiveFilm: (filmTitle) => ({
    type: ActionType.GET_ACTIVE_FILM,
    payload: filmTitle,
  }),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_FILTER_BY_GENRE:
      return extend(state, {
        genre: action.payload,
      });

    case ActionType.GET_MOVIE_LIST:
      if (action.payload === `All genres`) {
        return extend(state, {
          films: initialState.films,
        });
      }

      return extend(state, {
        films: initialState.films.filter((film) => film.genre === action.payload),
      });

    case ActionType.GET_ACTIVE_FILM:
      return extend(state, {
        activeFilm: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
