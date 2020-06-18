import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

const title = `Bohemian Rhapsody`;
const poster = `img/bohemian-rhapsody.jpg`;

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should film title be pressed`, () => {
  const onFilmTitleClick = jest.fn();
  const onFilmCardMouseEnter = jest.fn();

  const main = shallow(
      <MovieCard
        title={title}
        poster={poster}
        onFilmTitleClick={() => onFilmTitleClick({title})}
        onFilmCardMouseEnter={onFilmCardMouseEnter}
      />
  );

  const filmTitle = main.find(`article.small-movie-card`);

  filmTitle.simulate(`click`);

  expect(onFilmTitleClick).toHaveBeenCalledWith({title});

  // filmTitle.props().onClick();

  // expect(onFilmTitleClick.mock.calls.length).toBe(1);
});

it(`checks that when you hover over the card with the movie, the movie information gets to the handler`, () => {
  const onFilmTitleClick = jest.fn();
  const onFilmCardMouseEnter = jest.fn();

  const main = shallow(
      <MovieCard
        title={title}
        poster={poster}
        onFilmTitleClick={onFilmTitleClick}
        onFilmCardMouseEnter={() => onFilmCardMouseEnter({title, poster})}
      />
  );

  const filmCard = main.find(`article.small-movie-card`);

  filmCard.simulate(`mouseenter`);

  expect(onFilmCardMouseEnter).toHaveBeenCalledWith({title, poster});
});
