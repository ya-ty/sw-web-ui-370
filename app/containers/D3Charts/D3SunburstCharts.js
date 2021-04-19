import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Sunburst from 'sunburst-chart';
import * as d3 from 'd3';
import { withStyles } from '@material-ui/core/styles';
import data from 'enl-api/dummy/d3Charts/sunburstCharts.json';

const styles = () => ({
  container: {
    height: 'calc(100vh - 200px)'
  }
});

class D3SunburstCharts extends Component {
  container = createRef(null)

  state = {
    rendered: false
  }

  componentDidMount() {
    setTimeout(() => {
      this.renderChart();
    }, 100);
  }

  renderChart = () => {
    const { rendered } = this.state;

    if (this.container && this.container.current && !rendered) {
      const chart = Sunburst();
      const color = d3.scaleOrdinal(d3.schemePaired);

      chart
        .data(data)
        .color((d, parent) => color(parent ? parent.data.name : null))
        .width(this.container.current.clientWidth)
        .height(this.container.current.clientHeight)(this.container.current);
      this.setState({ rendered: true });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div ref={this.container} className={classes.container} />
    );
  }
}

D3SunburstCharts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(D3SunburstCharts);
