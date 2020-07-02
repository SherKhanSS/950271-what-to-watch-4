import {films} from "./mocks/films.js";

const MAX_GENRES_LENGHT = 9;
const GENRE_DEFAULT = `All genres`;
const FILMS_LENGTH = 8;

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const genres = [GENRE_DEFAULT, ...new Set(films.map((film) => film.genre).slice(0, MAX_GENRES_LENGHT))];

const initialState = {
  currentGenre: GENRE_DEFAULT,
  activeFilm: null,
  filmsLength: FILMS_LENGTH,
  films,
  genres,
};

const ActionType = {
  CHANGE_FILTER_BY_GENRE: `CHANGE_FILTER_BY_GENRE`,
  SET_FILMS_LENGTH: `SET_FILMS_LENGTH`,
  SET_ACTIVE_FILM: `SET_ACTIVE_FILM`,
  DROP_FILMS_LENGTH: `DROP_FILMS_LENGTH`,
};

const ActionCreator = {
  changeCurrentGenre: (genre) => ({
    type: ActionType.CHANGE_FILTER_BY_GENRE,
    payload: genre,
  }),

  changeActiveFilm: (filmTitle) => ({
    type: ActionType.SET_ACTIVE_FILM,
    payload: filmTitle,
  }),

  changeFilmsLength: () => ({
    type: ActionType.SET_FILMS_LENGTH,
    payload: FILMS_LENGTH,
  }),

  dropFilmsLength: () => ({
    type: ActionType.DROP_FILMS_LENGTH,
    payload: FILMS_LENGTH,
  }),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_FILTER_BY_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionType.SET_ACTIVE_FILM:
      return extend(state, {
        activeFilm: action.payload,
      });

    case ActionType.SET_FILMS_LENGTH:
      return extend(state, {
        filmsLength: state.filmsLength + action.payload,
      });

    case ActionType.DROP_FILMS_LENGTH:
      return extend(state, {
        filmsLength: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
