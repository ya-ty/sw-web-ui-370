import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { StackedBarSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { fitWidth } from 'react-stockcharts/lib/helper';
import * as d3 from 'd3';
import { withStyles } from '@material-ui/core/styles';
import data from 'enl-api/dummy/d3Charts/stackedBarCharts';

const styles = () => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class D3StackedBarCharts extends Component {
  state = {
    ratio: window.devicePixelRatio || 1
  }

  render() {
    const { ratio } = this.state;
    const { classes } = this.props;

    const f = d3.scaleOrdinal(d3.schemePaired);

    const fill = (d, i) => f(i);

    return (
      <div className={classes.container}>
        <ChartCanvas
          ratio={ratio}
          width={700}
          height={520}
          margin={{
            left: 40, right: 10, top: 20, bottom: 30
          }}
          type="svg"
          seriesName="Fruits"
          xExtents={list => list.map(d => d.year)}
          data={data}
          xAccessor={d => d.year}
          xScale={d3.scalePoint()}
          padding={1}
        >
          <Chart
            id={1}
            yExtents={[0, d => d.redDelicious + d.mcintosh + d.oranges + d.pears]}
          >
            <XAxis axisAt="bottom" orient="bottom" />
            <YAxis axisAt="left" orient="left" />
            <StackedBarSeries
              yAccessor={[d => d.redDelicious, d => d.mcintosh, d => d.oranges, d => d.pears]}
              fill={fill}
            />
          </Chart>
        </ChartCanvas>
      </div>
    );
  }
}

D3StackedBarCharts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(fitWidth(D3StackedBarCharts));
