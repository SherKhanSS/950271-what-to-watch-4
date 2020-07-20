import * as React from "react";
import * as renderer from "react-test-renderer";
import GenresItem from "./genres-item";
import {noop} from "../../utils";

const genre = `Drama`;

it(`Render GenresItem`, () => {
  const tree = renderer
    .create(<GenresItem
      genre={genre}
      isActive={true}
      onGenresItemClick={noop}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
