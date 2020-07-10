import React from "react";
import renderer from "react-test-renderer";
import SingIn from "./sign-in.jsx";

it(`Render SingIn`, () => {
  const tree = renderer
    .create(<SingIn
      onSubmit={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
