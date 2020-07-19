import * as React from "react";
import renderer from "react-test-renderer";
import GenresList from "./genres-list.jsx";

const genres = [`Drama`, `Sci-Fi`, `Comedies`, `Crime`];
const currentGenre = `All genres`;

it(`Render GenresList`, () => {
  const tree = renderer
    .create(<GenresList
      genres={genres}
      currentGenre={currentGenre}
      onGenresItemClick={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
