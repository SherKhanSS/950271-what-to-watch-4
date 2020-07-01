import React from "react";
import renderer from "react-test-renderer";
import Comments from "./comments.jsx";

const comments = [
  {
    text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director&apos;s funniest and most exquisitely designed movies in years.`,
    author: `Kate Muir`,
    date: `2016-12-24`,
    rating: `8,9`,
  },
  {
    text: `Anderson&apos;s films are too precious for some, but for those of us willing to lose ourselves in them, they&apos;re a delight. &quot;The Grand Budapest Hotel&quot; is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
    author: `Bill Goodykoontz`,
    date: `2015-11-18`,
    rating: `8,0`,
  },
  {
    text: `I didn&apos;t find it amusing, and while I can appreciate the creativity, it&apos;s an hour and 40 minutes I wish I could take back.`,
    author: `Amanda Greever`,
    date: `2015-11-18`,
    rating: `8,0`,
  },
];

it(`Render Comments`, () => {
  const tree = renderer
    .create(<Comments
      comments={comments}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

