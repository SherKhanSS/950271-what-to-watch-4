import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const filmTitleHandler = () => {};

const App = (props) => {

  const {filmInfo, films} = props;

  return (
    <Main
      filmInfo={filmInfo}
      films={films}
      onFilmTitleClick={filmTitleHandler}
    />
  );
};

App.propTypes = {
  filmInfo: PropTypes.object.isRequired,
  films: PropTypes.array.isRequired,
};

export default App;
