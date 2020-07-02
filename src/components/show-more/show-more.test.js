import React from "react";
import renderer from "react-test-renderer";
import ShowMore from "./show-more.jsx";

it(`Render ShowMore`, () => {
  const tree = renderer
    .create(<ShowMore
      onShowMoreClick={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

