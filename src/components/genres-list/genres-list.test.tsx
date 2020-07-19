import * as React from "react";
import * as renderer from "react-test-renderer";
import GenresList from "./genres-list";

const genres: string[] = [`Drama`, `Sci-Fi`, `Comedies`, `Crime`];
const currentGenre: string = `All genres`;

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
