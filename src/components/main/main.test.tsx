import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history";
import Main from "./main";
import {Film} from "../../types";
import {noop} from "../../utils";

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

const genres: string[] = [`Drama`, `Sci-Fi`, `Comedies`, `Crime`];
const currentGenre = `All genres`;
const filmsLength = 8;

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Main
            film={films[0]}
            films={films}
            genres={genres}
            favoritesFilms={[]}
            currentGenre={currentGenre}
            filmsLength={filmsLength}
            isAuthorized={false}
            onGenresItemClick={noop}
            onShowMoreClick={noop}
            onAddButtonClick={noop}
            onFilmCardClick={noop}
          />
        </Router>
        , {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
