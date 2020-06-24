import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player.jsx";

const poster = `img/bohemian-rhapsody.jpg`;
const preview = `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`;

it(`Render VideoPlayer`, () => {
  const tree = renderer
    .create(<VideoPlayer
      poster={poster}
      preview={preview}
      isPlaying={false}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
