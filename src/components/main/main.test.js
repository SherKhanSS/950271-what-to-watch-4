import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const film = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

const films = [
  {
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    cover: `img/bg-the-grand-budapest-hotel.jpg`,
  },
  {
    title: `Bohemian Rhapsody`,
    poster: `img/bohemian-rhapsody.jpg`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    cover: `img/bg-the-grand-budapest-hotel.jpg`,
  },
  {
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
    .create(<Main
      film={film}
      films={films}
      genres={genres}
      currentGenre={currentGenre}
      filmsLength={filmsLength}
      isAuthorized={false}
      onGenresItemClick={() => {}}
      onFilmTitleClick={() => {}}
      onShowMoreClick={() => {}}
      onPlayButtonClick={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
