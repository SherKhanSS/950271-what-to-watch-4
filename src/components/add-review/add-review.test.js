import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";

it(`Render AddReview`, () => {
  const tree = renderer
    .create(<AddReview
      onSubmit={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
