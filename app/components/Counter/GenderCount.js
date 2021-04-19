import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import icons from 'enl-api/images/icons';

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    marginRight: '26px',
  },
  maleCount: {
    color: '#25AEF3',
  },
  femaleCount: {
    color: '#FE008E',
  },
  image: {
    width: '16px',
    height: '32px',
  },
});

class GenderCount extends PureComponent {
  render() {
    const { classes, male, female } = this.props;

    return (
      <div className={classes.root}>
        <Typography className={classes.femaleCount}>{female}</Typography>
        <img className={classes.image} src={icons.female} alt="female" />
        <img className={classes.image} src={icons.male} alt="male" />
        <Typography className={classes.maleCount}>{male}</Typography>
      </div>
    );
  }
}

GenderCount.propTypes = {
  classes: PropTypes.object.isRequired,
  male: PropTypes.number.isRequired,
  female: PropTypes.number.isRequired,
};

export default withStyles(styles)(GenderCount);
