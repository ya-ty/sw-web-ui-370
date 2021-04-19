import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import brand from 'enl-api/dummy/brand';
import { getActivities } from 'enl-redux/actions/activityActions';
import {
  CounterIconsWidget,
  PerformanceChartWidget,
  DateWidget,
  TaskWidget,
  WeatherWidget,
  ContactWidget,
  TimelineWidget,
  FilesWidget,
} from 'enl-components';

import styles from './dashboard-jss';


class AnalyticDashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.ticker = null;
  }

  componentDidMount() {
    const { getActivitiesFn } = this.props;
    getActivitiesFn();

    this.ticker = setInterval(() => {
      getActivitiesFn();
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.ticker);
  }

  render() {
    const title = brand.name + ' - Personal Dashboard';
    const description = brand.desc;
    const { classes, activities } = this.props;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        {/* 1st Section */}
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={12}>
            <CounterIconsWidget activities={activities || undefined} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        {/* 2nd Section */}
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={12}>
            <PerformanceChartWidget activities={activities || undefined} />
          </Grid>
        </Grid>
        {/* 3rd Section */}
        <Grid container spacing={3} className={classes.root}>
          <Grid item md={6} xs={12}>
            <Divider className={classes.divider} />
            <ContactWidget />
            <Divider className={classes.divider} />
            <TaskWidget />
          </Grid>
          <Grid item md={6} xs={12}>
            <Hidden mdDown>
              <Divider className={classes.divider} />
            </Hidden>
            <WeatherWidget />
            <Divider className={classes.divider} />
            <DateWidget />
            <Divider className={classes.divider} />
            <TimelineWidget />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <FilesWidget />
      </div>
    );
  }
}

AnalyticDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  getActivitiesFn: PropTypes.func.isRequired,
  activities: PropTypes.object,
};

AnalyticDashboard.defaultProps = {
  activities: null,
};

const mapDispatchToProps = {
  getActivitiesFn: getActivities,
};

const reducer = 'activity';
const mapStateToProps = state => ({
  activities: state.get(reducer).activities,
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AnalyticDashboard));
