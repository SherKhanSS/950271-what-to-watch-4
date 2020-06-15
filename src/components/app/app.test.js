import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

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

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      filmInfo={filmInfo}
      filmTitles={filmTitles}
      onFilmTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
