import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const title = `Bohemian Rhapsody`;
const image = `img/bohemian-rhapsody.jpg`;

it(`Render MovieCard`, () => {
  const tree = renderer
    .create(<MovieCard
      title={title}
      image={image}
      onFilmTitleClick={() => {}}
      onFilmCardMouseEnter={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
