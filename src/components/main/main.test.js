import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const film = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

const films = [
  {
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    title: `Bohemian Rhapsody`,
    poster: `img/bohemian-rhapsody.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    title: `Macbeth`,
    poster: `img/macbeth.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    title: `Aviator`,
    poster: `img/aviator.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    title: `We need to talk about Kevin`,
    poster: `img/we-need-to-talk-about-kevin.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    title: `What We Do in the Shadows`,
    poster: `img/what-we-do-in-the-shadows.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    title: `Revenant`,
    poster: `img/revenant.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    title: `Johnny English`,
    poster: `img/johnny-english.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
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
      onGenresItemClick={() => {}}
      onFilmTitleClick={() => {}}
      onShowMoreClick={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
