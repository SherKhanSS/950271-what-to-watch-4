import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

const title = `Bohemian Rhapsody`;

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should film title be pressed`, () => {
  const onFilmTitleClick = jest.fn();

  const main = shallow(
      <MovieCard
        title={title}
        onFilmTitleClick={onFilmTitleClick}
      />
  );

  const filmTitle = main.find(`h3.small-movie-card__title`);

  filmTitle.props().onClick();

  expect(onFilmTitleClick.mock.calls.length).toBe(1);
});
