import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";

const title = `Bohemian Rhapsody`;
const poster = `img/bohemian-rhapsody.jpg`;
const preview = `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`;

configure({
  adapter: new Adapter(),
});

it(`When you click on a title, a callback is called with the value of the id.`, () => {
  const onFilmCardClick = jest.fn();
  const onFilmCardMouseEnter = jest.fn();
  const onFilmCardMouseLeave = jest.fn();

  const main = shallow(
      <MovieCard
        title={title}
        poster={poster}
        preview={preview}
        id={1}
        isPlaying={false}
        onFilmCardClick={() => onFilmCardClick(1)}
        onFilmCardMouseEnter={onFilmCardMouseEnter}
        onFilmCardMouseLeave={onFilmCardMouseLeave}
      />
  );

  const filmTitle = main.find(`h3.small-movie-card__title`);

  filmTitle.simulate(`click`, {
    preventDefault: onFilmCardClick,
  });

  expect(onFilmCardClick).toHaveBeenCalledWith(1);
});

it(`When you click on a poster, a callback is called with the title value of the movie id.`, () => {
  const onFilmCardClick = jest.fn();
  const onFilmCardMouseEnter = jest.fn();
  const onFilmCardMouseLeave = jest.fn();

  const main = shallow(
      <MovieCard
        title={title}
        poster={poster}
        preview={preview}
        id={1}
        isPlaying={false}
        onFilmCardClick={() => onFilmCardClick(1)}
        onFilmCardMouseEnter={onFilmCardMouseEnter}
        onFilmCardMouseLeave={onFilmCardMouseLeave}
      />
  );

  const filmImage = main.find(`div.small-movie-card__image`);

  filmImage.simulate(`click`);

  expect(onFilmCardClick).toHaveBeenCalledWith(1);
});

it(`checks that when you hover over the card with the movie, the movie information gets to the handler`, () => {
  const onFilmCardClick = jest.fn();
  const onFilmCardMouseEnter = jest.fn();
  const onFilmCardMouseLeave = jest.fn();

  const main = shallow(
      <MovieCard
        title={title}
        poster={poster}
        preview={preview}
        id={1}
        isPlaying={false}
        onFilmCardClick={onFilmCardClick}
        onFilmCardMouseEnter={() => onFilmCardMouseEnter({title, poster})}
        onFilmCardMouseLeave={onFilmCardMouseLeave}
      />
  );

  const filmCard = main.find(`article.small-movie-card`);

  filmCard.simulate(`mouseenter`);

  expect(onFilmCardMouseEnter).toHaveBeenCalledWith({title, poster});
});

it(`checks that when the cursor leaves the card, a callback is called`, () => {
  const onFilmCardClick = jest.fn();
  const onFilmCardMouseEnter = jest.fn();
  const onFilmCardMouseLeave = jest.fn();

  const main = shallow(
      <MovieCard
        title={title}
        poster={poster}
        preview={preview}
        id={1}
        isPlaying={false}
        onFilmCardClick={onFilmCardClick}
        onFilmCardMouseEnter={() => onFilmCardMouseEnter({title, poster})}
        onFilmCardMouseLeave={onFilmCardMouseLeave}
      />
  );

  const filmCard = main.find(`article.small-movie-card`);

  filmCard.simulate(`mouseleave`);

  expect(onFilmCardMouseLeave.mock.calls.length).toBe(1);
});
