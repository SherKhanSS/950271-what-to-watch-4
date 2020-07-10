import React from "react";
import renderer from "react-test-renderer";
import Loader from "./loader.jsx";

it(`Render Loader`, () => {
  const tree = renderer
    .create(<
      Loader
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
