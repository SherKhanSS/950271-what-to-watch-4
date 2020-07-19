import * as React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

const films = [
  {
    id: 1,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
];

it(`Render MoviesList`, () => {
  const tree = renderer
    .create(<MoviesList
      films={films}
      onFilmCardClick={() => {}}
      onFilmCardMouseEnter={() => {}}
      onFilmCardMouseLeave={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
