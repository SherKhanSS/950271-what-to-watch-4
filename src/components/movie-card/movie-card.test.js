import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

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
