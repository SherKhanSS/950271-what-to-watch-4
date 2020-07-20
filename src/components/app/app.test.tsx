import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app";
import NameSpace from "../../reducer/name-space";
import {Film, Review} from "../../types";
import {noop} from "../../utils";

const mockStore = configureStore([]);

const films: Film[] = [
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
    title: `The Grand Budapest Hotel`,
    videoLink: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    year: 2007,
  },
];

const reviews: Review[] = [
  {
    id: 1,
    user: {
      id: 4,
      name: `Kate Muir`
    },
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2019-05-08T14:13:56.569Z`
  }
];

const genres: string[] = [`All genres`];
const currentGenre = `All genres`;
const FILMS_LENGTH = 8;

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      films,
      promoFilm: films[0],
      genres,
    },
    [NameSpace.APP_STATE]: {
      currentGenre,
      filmsLength: FILMS_LENGTH,
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      onReviewSuccess: false,
      showSendError: false,
      isSent: false,
      favoritesFilms: [],
      reviews: [],
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            promoFilm={films[0]}
            films={films}
            reviews={reviews}
            genres={genres}
            favoritesFilms={[]}
            currentGenre={currentGenre}
            filmsLength={FILMS_LENGTH}
            showSendError={false}
            onReviewSuccess={false}
            authorizationStatus={`NO_AUTH`}
            onGenresItemClick={noop}
            onShowMoreClick={noop}
            onPlayerExitClick={noop}
            onAddButtonClick={noop}
            login={noop}
            sendReview={noop}
            isSent={false}
            onFilmCardClick={noop}
            onClosingReview={noop}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
