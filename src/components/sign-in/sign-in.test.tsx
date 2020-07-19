import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history";
import SingIn from "./sign-in";

it(`Render SingIn`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <SingIn
            onSubmit={() => {}}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
