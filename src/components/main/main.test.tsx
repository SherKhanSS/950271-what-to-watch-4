import * as React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history.js";
import Main from "./main.jsx";

const film = {
  id: 1,
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

const films = [
  {
    id: 1,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    cover: `img/bg-the-grand-budapest-hotel.jpg`,
  },
  {
    id: 2,
    title: `Bohemian Rhapsody`,
    poster: `img/bohemian-rhapsody.jpg`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    cover: `img/bg-the-grand-budapest-hotel.jpg`,
  },
  {
    id: 3,
    title: `Macbeth`,
    poster: `img/macbeth.jpg`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    cover: `img/bg-the-grand-budapest-hotel.jpg`,
  },
];

const genres = [`Drama`, `Sci-Fi`, `Comedies`, `Crime`];
const currentGenre = `All genres`;
const filmsLength = 8;

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Main
            film={film}
            id={1}
            films={films}
            genres={genres}
            favoritesFilms={[]}
            currentGenre={currentGenre}
            filmsLength={filmsLength}
            isAuthorized={false}
            onGenresItemClick={() => {}}
            onShowMoreClick={() => {}}
            onAddButtonClick={() => {}}
            onFilmCardClick={() => {}}
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
