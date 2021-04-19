import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { withStyles } from '@material-ui/core/styles';
import initialData from 'enl-api/dummy/d3Charts/pieCharts';

const styles = () => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const innerRadius = 0;
const outerRadius = 250;
const width = 500;
const height = 500;

const D3PieCharts = ({ classes }) => {
  const ref = useRef(null);
  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
  const color = d3.scaleOrdinal(d3.schemePaired);

  useEffect(
    () => {
      const data = createPie(initialData);
      const group = d3.select(ref.current);
      const groupWithData = group.selectAll('g.arc').data(data);

      groupWithData.exit().remove();

      const groupWithUpdate = groupWithData
        .enter()
        .append('g')
        .attr('class', 'arc');

      const path = groupWithUpdate
        .append('path')
        .merge(groupWithData.select('path.arc'));

      path
        .attr('class', 'arc')
        .attr('d', createArc)
        .attr('fill', (d, i) => color(i));

      const text = groupWithUpdate
        .append('text')
        .merge(groupWithData.select('text'));

      text
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('transform', d => `translate(${createArc.centroid(d)})`)
        .style('fill', 'white')
        .style('font-family', 'Lato')
        .style('font-size', '16px')
        .text(d => `${d.data.name} ${d.value}`);
    },
    [initialData]
  );

  return (
    <div className={classes.container}>
      <svg width={width} height={height}>
        <g
          ref={ref}
          transform={`translate(${outerRadius} ${outerRadius})`}
        />
      </svg>
    </div>
  );
};

D3PieCharts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(D3PieCharts);
