import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./data.js";
import {getAdaptedFilm} from "../../adapter/adapter.js";

const api = createAPI(() => {});

/* eslint-disable camelcase */
const notAdaptedFilms = [
  {
    name: `Beach`,
    poster_image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/beach.jpg`,
    preview_image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/beach.jpg`,
    background_image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/beach.jpg`,
    background_color: `#EBC996`,
    description: `Vicenarian Richard travels to Thailand and finds himself in possession of a strange map. Rumours state that it leads to a solitary beach paradise, a tropical bliss. Excited and intrigued, he sets out to find it.`,
    rating: 3.3,
    scores_count: 207824,
    director: `Danny Boyle`,
    starring: [`Leonardo DiCaprio`, `Daniel York`, `Patcharawan Patarakijjanon`],
    run_time: 119,
    genre: `Adventure`,
    released: 2000,
    id: 1,
    is_favorite: false,
    video_link: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
    preview_video_link: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  }
];
/* eslint-enable camelcase */

const films = [
  {
    backgroundColor: `#BDAD8F`,
    cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/No_Country_for_Old_Men.jpg`,
    description: `Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.`,
    director: `Ethan Coen`,
    genre: `Crime`,
    id: 1,
    isFavorite: false,
    poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/No_Country_for_Old_Men.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/no-country-for-old-men.jpg`,
    ratingCount: 764976,
    ratingScore: 4.1,
    runTime: 122,
    starring: [`Tommy Lee Jones`, `Javier Bardem`, `Josh Brolin`],
    title: `No Country for Old Men`,
    videoLink: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    year: 2007,
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
      .reply(200, notAdaptedFilms);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: [getAdaptedFilm(notAdaptedFilms[0])],
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_GENRES,
          payload: [`All genres`, `Adventure`],
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoFilmLoader = Operation.loadPromoFilm();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, notAdaptedFilms[0]);

    return promoFilmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_FILM,
          payload: getAdaptedFilm(notAdaptedFilms[0]),
        });
      });
  });
});
