import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { PlayCircleOutline } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';
import ReactPlayer from 'react-player';

const styles = () => ({
  container: {
    display: 'flex',
    marginBottom: 20,
    position: 'relative'
  },
  video: {
    marginRight: 8,
    width: '240px',
    height: '135px'
  },
  icon: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 47.5,
    left: 100,
    cursor: 'pointer'
  },
  loaderContainer: {
    position: 'relative',
    width: '240px',
    height: '135px',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class NotificationVideo extends PureComponent {
  state = {
    playing: false,
    loaded: false
  }

  setPlaying = playing => {
    this.setState({
      playing,
      loaded: true
    });
  }

  handleClick = () => {
    const { playing } = this.state;
    this.setPlaying(!playing);
  }

  render() {
    const { classes, source, meta } = this.props;
    const { playing, loaded } = this.state;

    return (
      <div className={classes.container}>
        <div style={{ display: loaded ? 'block' : 'none' }}>
          <ReactPlayer
            url={source}
            playing={playing}
            className={classes.video}
            height="135px"
            width="240px"
            config={{
              file: {
                forceHLS: true
              }
            }}
            onReady={() => this.setPlaying(true)}
            onEnded={() => this.setPlaying(false)}
            onClick={this.handleClick}
          />
        </div>
        <div style={{ display: loaded ? 'none' : 'flex' }} className={classes.loaderContainer}>
          <CircularProgress size={40} thickness={1} />
        </div>
        {!playing && loaded && <PlayCircleOutline className={classes.icon} onClick={this.handleClick} />}
        <div dangerouslySetInnerHTML={{ __html: meta }} />
      </div>
    );
  }
}

NotificationVideo.propTypes = {
  classes: PropTypes.object.isRequired,
  source: PropTypes.string.isRequired,
  meta: PropTypes.string.isRequired
};

export default withStyles(styles)(NotificationVideo);
