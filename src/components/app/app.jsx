import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const App = (props) => {

  const {filmInfo, filmTitles} = props;

  return (
    <Main
      filmInfo={filmInfo}
      filmTitles={filmTitles}
    />
  );
};

App.propTypes = {
  filmInfo: PropTypes.object.isRequired,
  filmTitles: PropTypes.array.isRequired,
};

export default App;
