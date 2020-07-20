import * as React from "react";
import * as renderer from "react-test-renderer";
import ShowMore from "./show-more";
import {noop} from "../../utils";

it(`Render ShowMore`, () => {
  const tree = renderer
    .create(<ShowMore
      onShowMoreClick={noop}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

