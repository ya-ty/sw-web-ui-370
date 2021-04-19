import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { data } from 'enl-api/dummy/heatMap';

import Sidebar from '../FilterPanel/Sidebar';
import MobileSidebar from '../FilterPanel/MobileSidebar';
import HeatMapWrapper from '../HeatMap/HeatMapWrapper';
import TypeFilters from '../HeatMap/TypeFilters';
import styles from './widget-jss';

const getInitialLevel = dataLayer => {
  if (dataLayer.subgroups) {
    return getInitialLevel(dataLayer.subgroups[0])
  }
  return dataLayer
}

class HeatMapWidget extends React.Component {
  filtered = []

  state = {
    type: '',
    level: getInitialLevel(data[0])
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);

    // const getX = () => {
    //   return (Math.random() * (1000 - 10) + 10).toFixed()
    // }
    
    // const getY = () => {
    //   return (Math.random() * (670 - 10) + 10).toFixed()
    // }
    
    // const getValue = () => {
    //   return (Math.random() * (100 - 20) + 20).toFixed()
    // }
    
    // let res = ''
    // for (let i = 0; i < 30; i++) {
    //   res += `{ x: ${getX()}, y: ${getY()}, value: ${getValue()} }, { x: ${getX()}, y: ${getY()}, value: ${getValue()} }, { x: ${getX()}, y: ${getY()}, value: ${getValue()} },\n`
    // }
    // console.log(res)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.forceUpdate();
  }

  filterType = type => {
    this.filtered = []
    this.getInitialFilteredLevel(data, type)

    this.setState({
      type,
      level: getInitialLevel(this.filtered[0])
    });
  }

  setLevel = level => {
    this.setState({ level });
  }

  getInitialFilteredLevel = (groups, type) => {
    groups.forEach(item => {
      if (!type || (item.category && item.category === type)) {
        this.filtered.push(item)
      } else if (item.subgroups) {
        this.getInitialFilteredLevel(item.subgroups, type)
      }
    })
  }

  render() {
    const { classes } = this.props;
    const { type, level } = this.state;

    return (
      <div className={classes.panel}>
        <Grid container>
          {window.innerWidth > 959.95 && (
            <Grid item xs={3} className={classes.heatMapSidebar}>
              <Sidebar
                data={data}
                activeLevel={level.id}
                setLevel={this.setLevel}
                type={type}
              />
            </Grid>
          )}
          <Grid item sm={12} md={9} className={classes.col}>
            {window.innerWidth <= 959.95
              ? (
                <Grid container>
                  <MobileSidebar
                    data={data}
                    activeLevel={level.id}
                    setLevel={this.setLevel}
                    type={type}
                  />
                  <TypeFilters filter={this.filterType} type={type} />
                </Grid>
              )
              : <TypeFilters filter={this.filterType} type={type} />
            }
            <HeatMapWrapper
              data={level.data}
              image={level.image}
              width={level.width}
              height={level.height}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

HeatMapWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeatMapWidget);
