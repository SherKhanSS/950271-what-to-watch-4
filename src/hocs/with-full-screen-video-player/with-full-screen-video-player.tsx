import * as React from "react";
import {getCurentFilm} from "../../utils";
import {Subtract} from "utility-types";

interface State {
  isPlay: boolean;
  isFullscreen: boolean;
  timeElapsed: number;
  progress: number;
  duration: number;
}

interface InjectingProps {
  isPlay: boolean;
  timeElapsed: number;
  currentProgresstimeElapsed: number;
  onPlayPauseButtonClick: () => void;
  onFullScreenClick: () => void;
}

const withFullScreenVideoPlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithFullScreenVideoPlayer extends React.PureComponent<T, State> {
    private _videoRef: React.RefObject<HTMLVideoElement>;

    constructor(props) {
      super(props);

      this.state = {
        isPlay: true,
        isFullscreen: false,
        timeElapsed: null,
        progress: null,
        duration: null,
      };

      this._videoRef = React.createRef();

      this.handlePlayPauseButtonClick = this.handlePlayPauseButtonClick.bind(this);
      this.handleFullScreenClick = this.handleFullScreenClick.bind(this);
    }

    componentDidMount() {
      const {films} = this.props;
      const film = getCurentFilm(films, this.props);
      const {poster, videoLink} = film;

      const video = this._videoRef.current;

      video.poster = poster;
      video.src = videoLink;

      video.ontimeupdate = () => this.setState({
        timeElapsed: Math.floor(video.duration - video.currentTime),
        progress: Math.floor(video.currentTime),
        duration: Math.floor(video.duration),
      });
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.poster = null;
      video.src = null;
      video.ontimeupdate = null;
    }

    componentDidUpdate() {
      const {isPlay, isFullscreen} = this.state;
      const video = this._videoRef.current;

      if (isPlay) {
        video.play();
      } else {
        video.pause();
      }

      if (isFullscreen) {
        video.requestFullscreen();
      }

      if (!document.fullscreenElement) {
        this.setState({
          isFullscreen: false,
        });
      }
    }

    handlePlayPauseButtonClick() {
      const {isPlay} = this.state;

      this.setState({
        isPlay: !isPlay
      });
    }

    handleFullScreenClick() {
      const {isFullscreen} = this.state;

      this.setState({
        isFullscreen: !isFullscreen
      });
    }

    render() {
      return (<Component
        {...this.props}
        isPlay={this.state.isPlay}
        timeElapsed={this.state.timeElapsed}
        currentProgress={Math.floor(this.state.progress * 100 / this.state.duration).toString()}
        onPlayPauseButtonClick={this.handlePlayPauseButtonClick}
        onFullScreenClick={this.handleFullScreenClick}
      >
        <video
          ref={this._videoRef}
          autoPlay={true}
          className="player__video"
        />
      </Component>
      );
    }
  }

  return WithFullScreenVideoPlayer;
};

export default withFullScreenVideoPlayer;
