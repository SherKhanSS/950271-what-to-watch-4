import * as React from "react";
import renderer from "react-test-renderer";
import GenresItem from "./genres-item.jsx";

const genre = `Drama`;

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
