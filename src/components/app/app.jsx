import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
    };
  }

  _renderApp() {
    const {film, films} = this.props;
    const {title} = this.state;

    if (title === null) {
      return (
        <Main
          film={film}
          films={films}
          onFilmTitleClick={(filmTitle) => {
            this.setState({
              title: filmTitle,
            });
          }}
        />
      );
    }

    if (title) {
      return (
        <MoviePage
          film={films.find((movie) => movie.title === title)}
        />
      );
    }

    return null;
  }

  _renderMoviePage() {
    const {film} = this.props;

    return (
      <MoviePage
        film={film}
      />
    );
  }

  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            {this._renderMoviePage()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  film: PropTypes.object.isRequired,
  films: PropTypes.array.isRequired,
};

export default App;
