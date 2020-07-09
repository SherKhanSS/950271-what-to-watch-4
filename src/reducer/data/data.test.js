import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./data.js";

const api = createAPI(() => {});

const films = [
  {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    year: 2014,
    runTime: `1h 39m`,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    cover: `img/bg-the-grand-budapest-hotel.jpg`,
    ratingScore: 8.9,
    ratingCount: 240,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.`,
    director: `Wes Andreson`,
    starring: `Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    films: null,
    promoFilm: null,
    genres: null,
  });
});

it(`Reducer should update films by load films`, () => {
  expect(reducer({
    films: null,
  }, {
    type: ActionType.LOAD_FILMS,
    payload: films,
  })).toEqual({
    films,
  });
});

it(`Reducer should update promoFilm by load promoFilm`, () => {
  expect(reducer({
    promoFilm: null,
  }, {
    type: ActionType.LOAD_PROMO_FILM,
    payload: films[0],
  })).toEqual({
    promoFilm: films[0],
  });
});

it(`Reducer should update promoFilm by load genres`, () => {
  expect(reducer({
    genres: null,
  }, {
    type: ActionType.LOAD_GENRES,
    payload: [films[0].genre],
  })).toEqual({
    genres: [films[0].genre],
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoFilmLoader = Operation.loadPromoFilm();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return promoFilmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_FILM,
          payload: [{fake: true}],
        });
      });
  });
});
