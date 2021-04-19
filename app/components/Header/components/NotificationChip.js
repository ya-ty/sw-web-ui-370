import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const styles = () => ({
  element: {
    borderRadius: 0,
    height: 20,
    marginRight: '8px'
  }
});

class NotificationChip extends Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <Chip {...rest} className={classes.element} />
    );
  }
}

NotificationChip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationChip);
