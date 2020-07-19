import * as React from "react";
import * as renderer from "react-test-renderer";
import FullScreenVideoPlayer from "./full-screen-video-player";

const poster: string = `img/bohemian-rhapsody.jpg`;
const preview: string = `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`;

it(`Render FullScreenVideoPlayer`, () => {
  const tree = renderer
    .create(<FullScreenVideoPlayer
      isPlay={true}
      timeElapsed={0}
      currentProgress={`0`}
      onPlayPauseButtonClick={() => {}}
      onFullScreenClick={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
