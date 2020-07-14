import {extend} from "../../utils.js";

const FILMS_LENGTH = 8;
const GENRE_DEFAULT = `All genres`;

const initialState = {
  currentGenre: GENRE_DEFAULT,
  filmsLength: FILMS_LENGTH,
  filmsAddedToWatch: new Set(),
};

const ActionType = {
  CHANGE_FILTER_BY_GENRE: `CHANGE_FILTER_BY_GENRE`,
  SET_FILMS_LENGTH: `SET_FILMS_LENGTH`,
  DROP_FILMS_LENGTH: `DROP_FILMS_LENGTH`,
  DROP_IS_PLAYING_FILM: `DROP_IS_PLAYING_FILM`,
  SET_FILMS_ADDED_TO_WATCH: `SET_FILMS_ADDED_TO_WATCH`,
};

const ActionCreator = {
  changeCurrentGenre: (genre) => ({
    type: ActionType.CHANGE_FILTER_BY_GENRE,
    payload: genre,
  }),

  changeFilmsLength: () => ({
    type: ActionType.SET_FILMS_LENGTH,
    payload: FILMS_LENGTH,
  }),

  dropFilmsLength: () => ({
    type: ActionType.DROP_FILMS_LENGTH,
    payload: FILMS_LENGTH,
  }),

  dropIsPlayingFilm: () => ({
    type: ActionType.DROP_IS_PLAYING_FILM,
    payload: false,
  }),

  setFilmsAddedToWatch: (list) => ({
    type: ActionType.SET_FILMS_ADDED_TO_WATCH,
    payload: list,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.CHANGE_FILTER_BY_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionType.SET_FILMS_LENGTH:
      return extend(state, {
        filmsLength: state.filmsLength + action.payload,
      });

    case ActionType.DROP_FILMS_LENGTH:
      return extend(state, {
        filmsLength: action.payload,
      });

    case ActionType.DROP_IS_PLAYING_FILM:
      return extend(state, {
        isPlayingFilm: action.payload,
      });

    case ActionType.SET_FILMS_ADDED_TO_WATCH:
      return extend(state, {
        filmsAddedToWatch: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
