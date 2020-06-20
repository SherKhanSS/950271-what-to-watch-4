import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {films, film} from "./mocks/films.js";

ReactDOM.render(
    <App
      film={film}
      films={films}
    />,
    document.querySelector(`#root`)
);
