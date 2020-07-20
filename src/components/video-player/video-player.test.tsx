import * as React from "react";
import * as renderer from "react-test-renderer";
import VideoPlayer from "./video-player";

const poster = `img/bohemian-rhapsody.jpg`;
const preview = `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`;

it(`Render VideoPlayer`, () => {
  const tree = renderer
    .create(<VideoPlayer
      poster={poster}
      preview={preview}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
