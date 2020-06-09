import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const film = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  date: 2014,
};

ReactDOM.render(
    <App
      filmInfo={film}
    />,
    document.querySelector(`#root`)
);
