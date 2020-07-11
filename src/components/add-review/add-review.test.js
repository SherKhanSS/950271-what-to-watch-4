import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";

const promoFilm = {
  id: 1,
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
  ratingScore: 8.9,
  ratingLevel: `Very good`,
  ratingCount: 240,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.`,
  textPartTwo: `Gustave prides himself on providing first-className service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
};

it(`Render AddReview`, () => {
  const tree = renderer
    .create(<AddReview
      film={promoFilm}
      onSubmitReview={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
