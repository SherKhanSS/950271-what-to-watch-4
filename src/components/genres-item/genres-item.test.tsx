import * as React from "react";
import * as renderer from "react-test-renderer";
import GenresItem from "./genres-item";

const genre: string = `Drama`;

it(`Render GenresItem`, () => {
  const tree = renderer
    .create(<GenresItem
      genre={genre}
      isActive={true}
      onGenresItemClick={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
