import {reducer, ActionType} from "./app-state.js";

const GENRE_DEFAULT = `All genres`;
const FILMS_LENGTH = 8;


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    filmsLength: FILMS_LENGTH,
    isPlayingFilm: false,
  });
});

it(`Reducer should change the genre to a given value`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    filmsLength: FILMS_LENGTH,
    isPlayingFilm: false,
  }, {
    type: ActionType.CHANGE_FILTER_BY_GENRE,
    payload: `Drama`,
  })).toEqual({
    currentGenre: `Drama`,
    activeFilm: null,
    filmsLength: FILMS_LENGTH,
    isPlayingFilm: false,
  });
});

it(`Reducer should change the movie to a given value`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    filmsLength: FILMS_LENGTH,
    isPlayingFilm: false,
  }, {
    type: ActionType.SET_ACTIVE_FILM,
    payload: `The Grand Budapest Hotel`,
  })).toEqual({
    currentGenre: GENRE_DEFAULT,
    activeFilm: `The Grand Budapest Hotel`,
    filmsLength: FILMS_LENGTH,
    isPlayingFilm: false,
  });
});

it(`Reducer should change the length of the movie list to a given value`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    filmsLength: FILMS_LENGTH,
    isPlayingFilm: false,

  }, {
    type: ActionType.SET_FILMS_LENGTH,
    payload: FILMS_LENGTH,
  })).toEqual({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    filmsLength: 16,
    isPlayingFilm: false,

  });
});

it(`Reducer should change the length of the movie list to a initial value`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    filmsLength: 16,
    isPlayingFilm: false,

  }, {
    type: ActionType.DROP_FILMS_LENGTH,
    payload: FILMS_LENGTH,
  })).toEqual({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    filmsLength: 8,
    isPlayingFilm: false,

  });
});

it(`Reducer should change  the playback to a false`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    filmsLength: FILMS_LENGTH,
    isPlayingFilm: true,

  }, {
    type: ActionType.DROP_IS_PLAYING_FILM,
    payload: false,
  })).toEqual({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    filmsLength: FILMS_LENGTH,
    isPlayingFilm: false,

  });
});

it(`Reducer should change  the playback to a true`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    filmsLength: FILMS_LENGTH,
    isPlayingFilm: false,

  }, {
    type: ActionType.ACTIVATE_PLAYING_FILM,
    payload: true,
  })).toEqual({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    filmsLength: FILMS_LENGTH,
    isPlayingFilm: true,

  });
});
