import * as React from "react";
import * as renderer from "react-test-renderer";
import GenresList from "./genres-list";
import {noop} from "../../utils";

const genres: string[] = [`Drama`, `Sci-Fi`, `Comedies`, `Crime`];
const currentGenre = `All genres`;

it(`Render GenresList`, () => {
  const tree = renderer
    .create(<GenresList
      genres={genres}
      currentGenre={currentGenre}
      onGenresItemClick={noop}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
