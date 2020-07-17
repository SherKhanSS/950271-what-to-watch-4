import React from "react";
import renderer from "react-test-renderer";
import FullScreenVideoPlayer from "./full-screen-video-player.jsx";

const poster = `img/bohemian-rhapsody.jpg`;
const preview = `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`;

it(`Render FullScreenVideoPlayer`, () => {
  const tree = renderer
    .create(<FullScreenVideoPlayer
      isPlay={true}
      timeElapsed={0}
      currentProgress={`0`}
      onPlayPauseButtonClick={() => {}}
      onFullScreenClick={() => {}}
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
