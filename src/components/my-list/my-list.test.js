import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history.js";
import MyList from "./my-list.jsx";

export const films = [
  {
    id: 1,
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    year: 2014,
    runTime: 88,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    cover: `img/bg-the-grand-budapest-hotel.jpg`,
    ratingScore: 8.9,
    ratingCount: 240,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.`,
    textPartTwo: `Gustave prides himself on providing first-className service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    previewImage: `img/bohemian-rhapsody.jpg`,
  },
];

it(`Render MyList`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <MyList
            films={films}
            onFilmCardClick={() => {}}
          />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
