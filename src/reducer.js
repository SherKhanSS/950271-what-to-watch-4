import {films} from "./mocks/films.js";

const MAX_GENRES_LENGHT = 9;
const GENRE_DEFAULT = `All genres`;

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const genres = [GENRE_DEFAULT, ...new Set(films.map((film) => film.genre).slice(0, MAX_GENRES_LENGHT))];

const initialState = {
  curretGenre: GENRE_DEFAULT,
  activeFilm: null,
  films,
  genres,
};

const ActionType = {
  CHANGE_FILTER_BY_GENRE: `CHANGE_FILTER_BY_GENRE`,
  SET_MOVIE_LIST: `SET_MOVIE_LIST`,
  SET_ACTIVE_FILM: `SET_ACTIVE_FILM`,
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
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_FILTER_BY_GENRE:
      return extend(state, {
        curretGenre: action.payload,
      });

    case ActionType.SET_ACTIVE_FILM:
      return extend(state, {
        activeFilm: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
