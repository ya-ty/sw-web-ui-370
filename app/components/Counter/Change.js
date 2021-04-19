import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    marginRight: '8px',
  },
  positive: {
    borderWidth: '0 8px 18px 8px',
    borderColor: `transparent transparent ${lightGreen[500]} transparent`,
  },
  negative: {
    borderWidth: '18px 8px 0 8px',
    borderColor: `${red[500]} transparent transparent transparent`,
  },
  variance: {
    fontWeight: 300,
  },
  positiveChange: {
    color: lightGreen[500],
  },
  negativeChange: {
    color: red[500],
  },
});

class Change extends PureComponent {
  render() {
    const { classes, variance } = this.props;
    const positive = variance >= 0;

    return (
      <div className={classes.root}>
        {positive
          ? <div className={classNames(classes.triangle, classes.positive)} />
          : <div className={classNames(classes.triangle, classes.negative)} />
        }
        <div className={classNames(classes.variance, positive ? classes.positiveChange : classes.negativeChange)}>
          {`${variance > 0 ? '+' : ''}${variance}%`}
        </div>
      </div>
    );
  }
}

Change.propTypes = {
  classes: PropTypes.object.isRequired,
  variance: PropTypes.number.isRequired,
};

export default withStyles(styles)(Change);
