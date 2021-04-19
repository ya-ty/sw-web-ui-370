import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ComposedChart, Line, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Dvr from '@material-ui/icons/Dvr';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Healing from '@material-ui/icons/Healing';
import FilterCenterFocus from '@material-ui/icons/FilterCenterFocus';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import LocalActivity from '@material-ui/icons/LocalActivity';
import Typography from '@material-ui/core/Typography';
import 'enl-styles/vendors/rechart/styles.css';
import colorfull from 'enl-api/palette/colorfull';
import messages from './messages';
import PapperBlock from '../PapperBlock/PapperBlock';
import { formatTime } from '../../utils/helper';
import styles from './widget-jss';

const color = ({
  main: colorfull[2],
  secondary: colorfull[4],
  third: colorfull[0],
  fourth: colorfull[1],
});

class PerformanceChartWidget extends PureComponent {
  formatChartData = () => {
    const { activities } = this.props;

    return Object.keys(activities.trafficTrend.activeSeries).map(key => ({
      date: formatTime(key),
      Active: activities.trafficTrend.activeSeries[key],
      Traffic: activities.trafficTrend.trafficseries[key],
      Female: activities.trafficTrend.femalseries[key],
      Male: activities.trafficTrend.malesseries[key],
    }));
  }

  getProgressColor = i => {
    switch (i) {
      case 0:
        return 'pinkProgress';
      case 1:
        return 'purpleProgress';
      case 2:
        return 'orangeProgress';
      case 3:
        return 'greenProgress';
      default:
        return 'blueProgress';
    }
  }

  render() {
    const { classes, intl, activities } = this.props;

    const chartData = this.formatChartData();

    const progressList = activities.campaigns.map((item, i) => {
      const progressColor = this.getProgressColor(i);

      return (
        <li key={item.name}>
          <Typography gutterBottom>{item.name}</Typography>
          <LinearProgress
            variant="determinate"
            className={classNames(classes.progress, classes[progressColor])}
            value={item.progress}
          />
        </li>
      );
    });

    return (
      <PapperBlock whiteBg noMargin title={intl.formatMessage(messages.traffic_trend)} icon="timeline" desc="">
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <ul className={classes.bigResume}>
              <li>
                <Avatar className={classNames(classes.avatar, classes.orangeAvatar)}>
                  <Dvr />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.orangeText}>{activities.trendPeaks.traffic}</span>
                  <Typography noWrap>
                    <FormattedMessage {...messages.total_traffic} />
                  </Typography>
                </Typography>
              </li>
              <li>
                <Avatar className={classNames(classes.avatar, classes.indigoAvatar)}>
                  <CheckCircle />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.indigoText}>{activities.trendPeaks.active}</span>
                  <Typography noWrap>
                    <FormattedMessage {...messages.active_traffic} />
                  </Typography>
                </Typography>
              </li>
              <li>
                <Avatar className={classNames(classes.avatar, classes.pinkAvatar)}>
                  <Healing />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.pinkText}>{activities.trendPeaks.female}</span>
                  <Typography noWrap>
                    <FormattedMessage {...messages.female} />
                  </Typography>
                </Typography>
              </li>
              <li>
                <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>
                  <LocalActivity />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.purpleText}>{activities.trendPeaks.male}</span>
                  <Typography noWrap>
                    <FormattedMessage {...messages.male} />
                  </Typography>
                </Typography>
              </li>
            </ul>
            <div className={classes.chartWrap}>
              <div className={classes.chartFluid}>
                <ResponsiveContainer>
                  <ComposedChart
                    data={chartData}
                  >
                    <XAxis dataKey="date" tickLine={false} />
                    <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="basis" stackId="2" dataKey="Active" stroke="none" fill={color.secondary} />
                    <Area type="monotone" stackId="1" stroke="none" dataKey="Traffic" fill={color.fourth} />
                    <Area type="monotone" stackId="3" dataKey="Male" stroke="none" fill={color.main} />
                    <Line type="monotone" dataKey="Female" strokeWidth={2} stroke={color.third} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography className={classes.smallTitle} variant="button">
              <FilterCenterFocus className={classes.leftIcon} />
              <FormattedMessage {...messages.campaign_success} />
            </Typography>
            <Divider className={classes.divider} />
            <ul className={classes.secondaryWrap}>
              {progressList}
            </ul>
          </Grid>
        </Grid>
      </PapperBlock>
    );
  }
}

PerformanceChartWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  activities: PropTypes.object,
};

PerformanceChartWidget.defaultProps = {
  activities: {
    campaigns: [],
    trafficTrend: {
      activeSeries: {},
      trafficseries: {},
      malesseries: {},
      femalseries: {}
    },
    trendPeaks: {
      active: 0,
      traffic: 0,
      female: 0,
      male: 0
    }
  }
};

export default withStyles(styles)(injectIntl(PerformanceChartWidget));
