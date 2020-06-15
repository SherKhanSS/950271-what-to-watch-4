import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

const filmInfo = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  date: 2014,
};

const filmTitles = [
  `Fantastic Beasts: The Crimes of Grindelwald`,
  `Bohemian Rhapsody`,
  `Macbeth`,
  `Aviator`,
  `We need to talk about Kevin`,
  `What We Do in the Shadows`,
  `Revenant`,
  `Johnny English`,
  `Shutter Island`,
  `Pulp Fiction`,
  `No Country for Old Men`,
  `Snatch`,
  `Moonrise Kingdom`,
  `Seven Years in Tibet`,
  `Midnight Special`,
  `War of the Worlds`,
  `Dardjeeling Limited`,
  `Orlando`,
  `Mindhunter`,
  `Midnight Special`,
];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should film title be pressed`, () => {
  const onFilmTitleClick = jest.fn();

  const main = shallow(
      <Main
        filmInfo={filmInfo}
        filmTitles={filmTitles}
        onFilmTitleClick={onFilmTitleClick}
      />
  );

  const filmTitle = main.find(`h3.small-movie-card__title`);

  filmTitle.props().onClick();

  expect(onFilmTitleClick.mock.calls.length).toBe(1);
});
