import * as React from "react";
import * as renderer from "react-test-renderer";
import MovieCard from "./movie-card";
import {noop} from "../../utils";

const title = `Bohemian Rhapsody`;
const poster = `img/bohemian-rhapsody.jpg`;
const preview = `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`;

it(`Render MovieCard`, () => {
  const tree = renderer
    .create(<MovieCard
      title={title}
      poster={poster}
      preview={preview}
      id={1}
      isPlaying={false}
      onFilmCardClick={noop}
      onFilmCardMouseEnter={noop}
      onFilmCardMouseLeave={noop}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
