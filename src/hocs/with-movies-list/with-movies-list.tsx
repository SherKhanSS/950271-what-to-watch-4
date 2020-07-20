import * as React from "react";
import {Subtract} from "utility-types";

const PLAY_DELAY = 1000;

interface State {
  title: string;
  poster: string;
  timerId: NodeJS.Timer;
}

interface InjectingProps {
  title: string;
  onFilmCardMouseEnter: () => void;
  onFilmCardMouseLeave: () => void;
}

const withMoviesList = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithMoviesList extends React.PureComponent<T, State> {
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

    componentWillUnmount() {
      const {timerId} = this.state;

      this.setState({
        title: null,
        poster: null,
        timerId: null,
      });

      clearTimeout(timerId);
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

  return WithMoviesList;
};

export default withMoviesList;
