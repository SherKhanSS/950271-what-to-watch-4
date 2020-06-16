import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import films from "./mocks/films.js";

const film = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  date: 2014,
};

ReactDOM.render(
    <App
      filmInfo={film}
      films={films}
    />,
    document.querySelector(`#root`)
);
