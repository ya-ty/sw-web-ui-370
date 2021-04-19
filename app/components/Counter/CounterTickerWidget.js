import React, { PureComponent } from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import lightGreen from '@material-ui/core/colors/lightGreen';
import Change from './Change';
import GenderCount from './GenderCount';
import { formatTime } from '../../utils/helper';

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    height: 190,
    marginBottom: 6,
    [theme.breakpoints.up('sm')]: {
      height: 126,
      marginBottom: -1,
      alignItems: 'flex-end',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    height: '100%',
    width: '100%',
  },
  rightSide: {
    backgroundColor: lightGreen[500],
    display: 'flex',
    alignItems: 'center',
    padding: '0 14px',
    height: '100%',
    borderRadius: 'inherit',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    color: theme.palette.common.white,
    fontSize: '26px',
    whiteSpace: 'nowrap',
    position: 'relative',

    [theme.breakpoints.down('xs')]: {
      borderRadius: 'inherit',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      justifyContent: 'center'
    },
  },
  upperContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  triangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '6px 0 6px 10px',
    borderColor: `transparent transparent transparent ${theme.palette.secondary.main}`,
    position: 'absolute',
    left: 0,

    [theme.breakpoints.down('xs')]: {
      transform: 'rotate(90deg)',
      top: -1,
      left: 'calc(50% - 6px)'
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  row: {
    display: 'flex',
    alignItems: 'center',

    '&:not(:last-child)': {
      marginTop: '4px',
    }
  },
  minmax: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  title: {
    color: theme.palette.common.white,
    fontSize: 14,
    [theme.breakpoints.up('sm')]: {
      fontSize: 16,
    },
    fontWeight: 400
  },
  subtitle: {
    color: theme.palette.common.white,
    fontSize: 14,
    marginLeft: '4px',
    lineHeight: 1
  },
  counter: {
    color: theme.palette.common.white,
    fontSize: 28,
    fontWeight: 500
  },
  text: {
    color: theme.palette.common.white,
    fontSize: 10,
    fontWeight: 400,
  },
  primaryLight: {
    background: theme.palette.primary.light,
    '& $title, $counter': {
      color: theme.palette.primary.main,
    }
  },
  primaryMain: {
    border: `1px solid ${fade(theme.palette.primary.main, 0.7)}`,
    '& $title, $counter': {
      color: theme.palette.primary.main,
    },
    '& svg': {
      color: theme.palette.primary.main,
    },
  },
  primaryDark: {
    background: theme.palette.primary.main,
    '& $title, $counter': {
      color: theme.palette.common.white,
    },
    '& svg': {
      color: theme.palette.primary.light,
    },
  },
  secondaryLight: {
    background: theme.palette.secondary.light,
    '& $title, $counter': {
      color: theme.palette.secondary.main,
    }
  },
  secondaryMain: {
    border: `1px solid ${fade(theme.palette.secondary.main, 0.7)}`,
    '& $title, $counter': {
      color: theme.palette.secondary.main,
    },
    '& svg': {
      color: theme.palette.secondary.main,
    },
  },
  secondaryDark: {
    background: theme.palette.secondary.main,
    '& $title, $counter': {
      color: theme.palette.common.white,
    },
    '& svg': {
      color: theme.palette.secondary.light,
    },
  }
});

class CounterTickerWidget extends PureComponent {
  render() {
    const {
      classes, color, data, title, children
    } = this.props;

    const bgColor = clr => {
      switch (clr) {
        case 'primary-light':
          return classes.primaryLight;
        case 'primary-dark':
          return classes.primaryDark;
        case 'secondary-light':
          return classes.secondaryLight;
        case 'secondary-main':
          return classes.secondaryMain;
        case 'secondary-dark':
          return classes.secondaryDark;
        default:
          return classes.primaryMain;
      }
    };

    return (
      <Paper className={classNames(classes.root, bgColor(color))}>
        <div className={classes.leftSide}>
          <div className={classes.upperContainer}>
            <Change variance={data.variance} />
            {data.male && data.female
              ? <GenderCount male={data.male} female={data.female} />
              : <div />
            }
          </div>
          <div className={classes.content}>
            <div>
              <Typography className={classes.counter}>
                <CountUp start={0} end={data.now} duration={3} useEasing />
              </Typography>
              <Typography className={classes.title} variant="subtitle1">{title}</Typography>
            </div>
            {data.todaymin && data.todaymax ? (
              <div className={classes.minmax}>
                <div className={classes.row}>
                  <Typography className={classes.text}>max</Typography>
                  <Typography className={classes.subtitle}>{data.todaymax}</Typography>
                </div>
                <Typography className={classes.text}>{formatTime(data.todaymaxtime)}</Typography>
                <div className={classes.row}>
                  <Typography className={classes.text}>max</Typography>
                  <Typography className={classes.subtitle}>{data.todaymin}</Typography>
                </div>
                <Typography className={classes.text}>{formatTime(data.todaymintime)}</Typography>
              </div>
            ) : children}
          </div>
        </div>
        {data.reccomendations ? (
          <div className={classes.rightSide}>
            <div className={classes.triangle} />
            {data.reccomendations}
          </div>
        ) : <div />}
      </Paper>
    );
  }
}

CounterTickerWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  children: PropTypes.node,
};

CounterTickerWidget.defaultProps = {
  children: null,
};

export default withStyles(styles)(CounterTickerWidget);
