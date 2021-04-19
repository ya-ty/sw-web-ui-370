/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import CircularProgress from '@material-ui/core/CircularProgress';
import classnames from 'classnames';
import icons from 'enl-api/images/icons';

import HeatMap from './HeatMap';

const styles = theme => ({
  root: {
    display: 'inline-block',
    width: '100%'
  },
  heatMapContainer: {
    position: 'relative',
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'auto',
    overflowX: 'hidden',

    [theme.breakpoints.down('sm')]: {
      maxHeight: '100%'
    },
  },
  fadeIn: {},
  heatMapImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    zIndex: 5,
    transition: 'opacity 0.2s ease-out',
    opacity: 0,

    '&$fadeIn': {
      opacity: 1
    }
  },
  layersIconWrap: {
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    zIndex: '11',
    position: 'fixed',
    right: '44px',
    bottom: '34px',
    padding: '3px',
    background: '#000',
    border: '5px solid #424244',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  layersIcon: {
    width: '24px',
    height: '24px',
  },
  heatMapToggles: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: 11,
    opacity: 0,
    position: 'fixed',
    bottom: '85px',
    right: '90px',
    background: theme.palette.type === 'dark' ? darken(theme.palette.primary.main, 0.6) : theme.palette.common.white,
    padding: theme.spacing(2.5),
    paddingLeft: theme.spacing(1),
    boxShadow: theme.shadows[7],

    '&.open': {
      opacity: 1,
    }
  },
  togglesTitle: {
    marginLeft: '12px'
  },
  heatMapRow: {
    display: 'flex',
    alignItems: 'center'
  },
  heatMapToggleLabel: {
    fontSize: '0.875rem'
  },
  loader: {
    position: 'absolute',
    top: 'calc(100vh - 50%)',
    left: 'calc(50% - 45px)',
  }
});

class HeatMapWrapper extends PureComponent {
  state = {
    showToggles: false,
    activeLayers: this.props.data.map((_layer, index) => index),
    fadeIn: false,
    isLoading: true
  }

  componentDidUpdate(prevProps) {
    const { data, image } = this.props;

    if (prevProps.image !== image) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        showToggles: false,
        activeLayers: data.map((_layer, index) => index),
        fadeIn: false,
        isLoading: true
      });
    }
  }

  toggleLayers = () => {
    const { showToggles } = this.state;
    this.setState({ showToggles: !showToggles });
  }

  handleChangeToggle = index => {
    const { activeLayers } = this.state;
    if (activeLayers.indexOf(index) === -1) {
      this.setState({ activeLayers: [...activeLayers, index] });
    } else {
      this.setState({ activeLayers: activeLayers.filter(item => item !== index) });
    }
  }

  handleLoadImage = () => {
    this.setState({ isLoading: false, fadeIn: true });
  }

  render() {
    const {
      classes, image, data, width, height
    } = this.props;
    const {
      showToggles, activeLayers, fadeIn, isLoading
    } = this.state;

    return (
      <div className={classes.root}>
        <div style={{ display: isLoading ? 'none' : 'block' }} className={classes.heatMapContainer}>
          {data.map((item, index) => (
            <HeatMap
              data={item}
              show={activeLayers.indexOf(index) >= 0}
              index={index}
              key={index}
              fadeIn={fadeIn}
              width={width}
              height={height}
              isLoading={isLoading}
            />
          ))}
          <img
            className={classnames(classes.heatMapImage, fadeIn ? classes.fadeIn : '')}
            alt="building"
            src={image}
            onLoad={this.handleLoadImage}
          />
          <button type="button" className={classes.layersIconWrap} onClick={this.toggleLayers}>
            <img
              src={icons.layers}
              alt="layers"
              className={classes.layersIcon}
              title={showToggles ? 'Hide layers' : 'Show layers'}
            />
          </button>
          <div className={classnames(classes.heatMapToggles, showToggles && 'open')}>
            <div className={classes.togglesTitle}>LAYERS</div>
            {data.map((item, index) => (
              <div className={classes.heatMapRow} key={`switch_${index}`}>
                <Switch
                  checked={activeLayers.indexOf(index) >= 0}
                  onChange={() => this.handleChangeToggle(index)}
                  name={`switch_${index}`}
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <div className={classes.heatMapToggleLabel}>{`Layer ${index + 1}`}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: isLoading ? 'block' : 'none' }}>
          <CircularProgress size={90} thickness={1} className={classes.loader} />
        </div>
      </div>
    );
  }
}

HeatMapWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default withStyles(styles)(HeatMapWrapper);
