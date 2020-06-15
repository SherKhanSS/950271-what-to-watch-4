import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const title = `Bohemian Rhapsody`;

it(`Render MovieCard`, () => {
  const tree = renderer
    .create(<MovieCard
      title={title}
      onFilmTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
