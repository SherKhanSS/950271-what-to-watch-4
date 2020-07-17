import {reducer, ActionType} from "./app-state.js";

const GENRE_DEFAULT = `All genres`;
const FILMS_LENGTH = 8;

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentGenre: GENRE_DEFAULT,
    filmsLength: FILMS_LENGTH,
  });
});

it(`Reducer should change the genre to a given value`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    filmsLength: FILMS_LENGTH,
  }, {
    type: ActionType.CHANGE_FILTER_BY_GENRE,
    payload: `Drama`,
  })).toEqual({
    currentGenre: `Drama`,
    filmsLength: FILMS_LENGTH,
  });
});

it(`Reducer should change the length of the movie list to a given value`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    filmsLength: FILMS_LENGTH,
  }, {
    type: ActionType.SET_FILMS_LENGTH,
    payload: FILMS_LENGTH,
  })).toEqual({
    currentGenre: GENRE_DEFAULT,
    filmsLength: 16,
  });
});

it(`Reducer should change the length of the movie list to a initial value`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    filmsLength: 16,
  }, {
    type: ActionType.DROP_FILMS_LENGTH,
    payload: FILMS_LENGTH,
  })).toEqual({
    currentGenre: GENRE_DEFAULT,
    filmsLength: 8,
  });
});
