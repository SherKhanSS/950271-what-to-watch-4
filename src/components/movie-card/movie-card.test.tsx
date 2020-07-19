import * as React from "react";
import * as renderer from "react-test-renderer";
import MovieCard from "./movie-card";

const title: string = `Bohemian Rhapsody`;
const poster: string = `img/bohemian-rhapsody.jpg`;
const preview: string = `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`;

it(`Render MovieCard`, () => {
  const tree = renderer
    .create(<MovieCard
      title={title}
      poster={poster}
      preview={preview}
      id={1}
      isPlaying={false}
      onFilmCardClick={() => {}}
      onFilmCardMouseEnter={() => {}}
      onFilmCardMouseLeave={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
