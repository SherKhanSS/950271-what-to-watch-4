import * as React from "react";
import * as renderer from "react-test-renderer";
import ShowMore from "./show-more";

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

