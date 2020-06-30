import React, {PureComponent} from 'react';
import PropTypes from "prop-types";

const PLAY_DELAY = 1000;

const withMoviesList = (Component) => {
  class WithMoviesList extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        title: null,
        poster: null,
        timerId: null,
      };

      this.handleFilmCardMouseEnter = this.handleFilmCardMouseEnter.bind(this);
      this.handleFilmCardMouseLeave = this.handleFilmCardMouseLeave.bind(this);
    }

    handleFilmCardMouseEnter(titleActive, posterActive) {

      const timer = setTimeout(() => {
        this.setState({
          title: titleActive,
          poster: posterActive,
        });
      }, PLAY_DELAY);
      this.setState({
        timerId: timer,
      });
    }

    handleFilmCardMouseLeave() {
      this.setState({
        title: null,
        poster: null,
        timerId: null,
      });
      const {timerId} = this.state;
      clearTimeout(timerId);
    }

    render() {
      return (<Component
        {...this.props}
        title={this.state.title}
        onFilmCardMouseEnter={this.handleFilmCardMouseEnter}
        onFilmCardMouseLeave={this.handleFilmCardMouseLeave}
      />);
    }
  }

  WithMoviesList.propTypes = {
    title: PropTypes.any,
    onFilmCardMouseEnter: PropTypes.func.isRequired,
    onFilmCardMouseLeave: PropTypes.func.isRequired,
  };

  return WithMoviesList;
};

export default withMoviesList;
