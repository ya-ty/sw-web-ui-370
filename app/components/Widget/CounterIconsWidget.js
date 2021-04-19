import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { injectIntl, intlShape } from 'react-intl';
import icons from 'enl-api/images/icons';
import CounterTickerWidget from '../Counter/CounterTickerWidget';
import messages from './messages';
import styles from './widget-jss';

class CounterIconWidget extends PureComponent {
  render() {
    const { classes, intl, activities } = this.props;

    return (
      <div className={classes.rootCounterFull}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <CounterTickerWidget
              color="secondary-dark"
              data={activities.activecount}
              title={intl.formatMessage(messages.active_visitors)}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <CounterTickerWidget
              color="secondary-main"
              data={activities.totalvistors}
              title={intl.formatMessage(messages.total_visitors)}
            >
              <img className={classes.cardIcon} src={icons.crowd} alt="crowd" />
            </CounterTickerWidget>
          </Grid>
          <Grid item xs={6} md={3}>
            <CounterTickerWidget
              color="secondary-main"
              data={activities.averagelvistors}
              title={intl.formatMessage(messages.average_visitors)}
            >
              <img className={classes.cardIcon} src={icons.crowd} alt="crowd" />
            </CounterTickerWidget>
          </Grid>
          <Grid item xs={6} md={3}>
            <CounterTickerWidget
              color="secondary-main"
              data={activities.activetraffic}
              title={intl.formatMessage(messages.active_traffic)}
            >
              <img className={classes.cardIcon} src={icons.traffic} alt="traffic" />
            </CounterTickerWidget>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CounterIconWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  activities: PropTypes.object,
};

CounterIconWidget.defaultProps = {
  activities: {
    activecount: {
      variance: 0
    },
    totalvistors: {
      variance: 0
    },
    averagelvistors: {
      variance: 0
    },
    activetraffic: {
      variance: 0
    },
  }
};

export default withStyles(styles)(injectIntl(CounterIconWidget));
