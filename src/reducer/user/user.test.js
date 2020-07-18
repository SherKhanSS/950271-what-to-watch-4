import {reducer, ActionType, ActionCreator, AuthorizationStatus} from "./user.js";

const film =
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
  };

const comment = {
  id: 1,
  user: {
    id: 4,
    name: `Kate Muir`
  },
  rating: 8.9,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  date: `2019-05-08T14:13:56.569Z`
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    onReviewSuccess: false,
    showSendError: false,
    isSent: false,
    favoritesFilms: [],
    reviews: [],
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });
});

it(`Reducer should change onReviewSuccess by a given value`, () => {
  expect(reducer({
    onReviewSuccess: false,
  }, {
    type: ActionType.SEND_REVIEW,
    payload: true,
  })).toEqual({
    onReviewSuccess: true,
  });
});

it(`Reducer should change showSendError by a given value`, () => {
  expect(reducer({
    showSendError: false,
  }, {
    type: ActionType.SET_SHOW_SEND_ERROR,
    payload: true,
  })).toEqual({
    showSendError: true,
  });
});

it(`Reducer should change isSent by a given value`, () => {
  expect(reducer({
    isSent: false,
  }, {
    type: ActionType.ACTIVATE_SENT,
    payload: true,
  })).toEqual({
    isSent: true,
  });
});

it(`Reducer should change isSent by a given value`, () => {
  expect(reducer({
    isSent: true,
  }, {
    type: ActionType.DEACTIVATE_SENT,
    payload: false,
  })).toEqual({
    isSent: false,
  });
});

it(`Reducer should update favoritesFilms by load favoritesFilms`, () => {
  expect(reducer({
    favoritesFilms: [],
  }, {
    type: ActionType.LOAD_FAVORITES_FILMS,
    payload: [film],
  })).toEqual({
    favoritesFilms: [film],
  });
});

it(`Reducer should update reviews by load reviews`, () => {
  expect(reducer({
    reviews: [],
  }, {
    type: ActionType.LOAD_REVIEV,
    payload: [comment],
  })).toEqual({
    reviews: [comment],
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });
});
