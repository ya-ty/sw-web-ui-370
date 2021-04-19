import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import brand from 'enl-api/dummy/brand';
import { HeatMapWidget } from 'enl-components';

import styles from './dashboard-jss';

class AnalyticDashboard extends PureComponent {
  render() {
    const title = brand.name + ' - HeatMap Dashboard';
    const description = brand.desc;
    const { classes } = this.props;

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
        <Grid container spacing={3} className={classes.root}>
          <HeatMapWidget />
        </Grid>
      </div>
    );
  }
}

AnalyticDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnalyticDashboard);
