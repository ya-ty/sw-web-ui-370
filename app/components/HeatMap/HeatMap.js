import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import h337 from 'heatmap.js';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  container: {
    width: '100%',
    overflow: 'hidden'
  },
  fadeIn: {},
  heatMap: {
    zIndex: '10',
    position: 'absolute !important',
    left: '0',
    top: '0',
    transition: 'opacity 0.2s ease-out',
    opacity: 0,
    transformOrigin: 'top left',

    '&$fadeIn': {
      opacity: 1
    }
  }
});

class HeatMapWidget extends Component {
  heatMapContainer = createRef()
  state = {
    scale: 1
  }

  componentDidMount() {
    const { index, isLoading } = this.props;

    window.addEventListener('resize', this.resize);

    if (!isLoading) {
      document.getElementById(`heatMap_${index}`).innerHTML = '';
      this.updateDimensions();
    }
  }

  componentDidUpdate(prevProps) {
    const { data, index, isLoading } = this.props;

    if (prevProps.data.id !== data.id || (prevProps.isLoading && !isLoading)) {
      document.getElementById(`heatMap_${index}`).innerHTML = '';
      this.updateDimensions();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { index } = this.props;

    document.getElementById(`heatMap_${index}`).innerHTML = '';
    this.updateDimensions();
  }

  updateDimensions = () => {
    const { width } = this.props;

    const imageWidth = this.heatMapContainer.current.clientWidth;
    this.setState({ scale: imageWidth / width }, () => {
      this.renderHeatMap();
    });
  }

  renderHeatMap = () => {
    const { data, index } = this.props;

    const newHeatMap = h337.create({
      container: document.getElementById(`heatMap_${index}`),
    });

    newHeatMap.addData(data.data);
  }

  render() {
    const {
      classes, index, fadeIn, width, height, show
    } = this.props;
    const { scale } = this.state;

    return (
      <div className={classes.container} ref={this.heatMapContainer}>
        <div
          className={classnames(classes.heatMap, fadeIn ? classes.fadeIn : '')}
          id={`heatMap_${index}`}
          style={{
            width,
            height,
            transform: `scale(${scale})`,
            display: show ? 'block' : 'none'
          }}
        />
      </div>
    );
  }
}

HeatMapWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  fadeIn: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default withStyles(styles)(HeatMapWidget);
