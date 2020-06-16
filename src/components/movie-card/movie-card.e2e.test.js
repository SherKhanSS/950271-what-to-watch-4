import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

const title = `Bohemian Rhapsody`;
const image = `img/bohemian-rhapsody.jpg`;

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should film title be pressed`, () => {
  const onFilmTitleClick = jest.fn();
  const onFilmCardMouseEnter = jest.fn();

  const main = shallow(
      <MovieCard
        title={title}
        image={image}
        onFilmTitleClick={onFilmTitleClick}
        onFilmCardMouseEnter={onFilmCardMouseEnter}
      />
  );

  const filmTitle = main.find(`h3.small-movie-card__title`);

  filmTitle.props().onClick();

  expect(onFilmTitleClick.mock.calls.length).toBe(1);
});

it(`checks that when you hover over the card with the movie, the movie information gets to the handler`, () => {
  const onFilmTitleClick = jest.fn();
  const onFilmCardMouseEnter = jest.fn();

  const main = shallow(
      <MovieCard
        title={title}
        image={image}
        onFilmTitleClick={onFilmTitleClick}
        onFilmCardMouseEnter={onFilmCardMouseEnter}
      />
  );

  const filmCard = main.find(`article.small-movie-card`);

  filmCard.simulate(`mouseenter`, {});
  // здесь непонятно, таким ли образом надо тестировать событие, что передавать во 2-й аргумент, и что ожидать

  expect(onFilmCardMouseEnter.mock.calls.length).toBe(1);
});
