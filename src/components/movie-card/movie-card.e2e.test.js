import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

const title = `Bohemian Rhapsody`;
const poster = `img/bohemian-rhapsody.jpg`;
const preview = `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`;

Enzyme.configure({
  adapter: new Adapter(),
});

it(`When you click on a title, a callback is called with the value of the title.`, () => {
  const onFilmTitleClick = jest.fn();
  const onFilmCardMouseEnter = jest.fn();
  const onFilmCardMouseLeave = jest.fn();

  const main = shallow(
      <MovieCard
        title={title}
        poster={poster}
        preview={preview}
        isPlaying={false}
        onFilmTitleClick={() => onFilmTitleClick({title})}
        onFilmCardMouseEnter={onFilmCardMouseEnter}
        onFilmCardMouseLeave={onFilmCardMouseLeave}
      />
  );

  const filmTitle = main.find(`h3.small-movie-card__title`);

  filmTitle.simulate(`click`, {
    preventDefault: onFilmTitleClick,
  });

  expect(onFilmTitleClick).toHaveBeenCalledWith({title});
});

it(`When you click on a poster, a callback is called with the title value of the movie.`, () => {
  const onFilmTitleClick = jest.fn();
  const onFilmCardMouseEnter = jest.fn();
  const onFilmCardMouseLeave = jest.fn();

  const main = shallow(
      <MovieCard
        title={title}
        poster={poster}
        preview={preview}
        isPlaying={false}
        onFilmTitleClick={() => onFilmTitleClick({title})}
        onFilmCardMouseEnter={onFilmCardMouseEnter}
        onFilmCardMouseLeave={onFilmCardMouseLeave}
      />
  );

  const filmImage = main.find(`div.small-movie-card__image`);

  filmImage.simulate(`click`);

  expect(onFilmTitleClick).toHaveBeenCalledWith({title});
});

it(`checks that when you hover over the card with the movie, the movie information gets to the handler`, () => {
  const onFilmTitleClick = jest.fn();
  const onFilmCardMouseEnter = jest.fn();
  const onFilmCardMouseLeave = jest.fn();

  const main = shallow(
      <MovieCard
        title={title}
        poster={poster}
        preview={preview}
        isPlaying={false}
        onFilmTitleClick={onFilmTitleClick}
        onFilmCardMouseEnter={() => onFilmCardMouseEnter({title, poster})}
        onFilmCardMouseLeave={onFilmCardMouseLeave}
      />
  );

  const filmCard = main.find(`article.small-movie-card`);

  filmCard.simulate(`mouseenter`);

  expect(onFilmCardMouseEnter).toHaveBeenCalledWith({title, poster});
});

it(`checks that when the cursor leaves the card, a callback is called`, () => {
  const onFilmTitleClick = jest.fn();
  const onFilmCardMouseEnter = jest.fn();
  const onFilmCardMouseLeave = jest.fn();

  const main = shallow(
      <MovieCard
        title={title}
        poster={poster}
        preview={preview}
        isPlaying={false}
        onFilmTitleClick={onFilmTitleClick}
        onFilmCardMouseEnter={() => onFilmCardMouseEnter({title, poster})}
        onFilmCardMouseLeave={onFilmCardMouseLeave}
      />
  );

  const filmCard = main.find(`article.small-movie-card`);

  filmCard.simulate(`mouseleave`);

  expect(onFilmCardMouseLeave.mock.calls.length).toBe(1);
});
