import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SidebarContent from './SidebarContent'

const styles = theme => ({
  root: {
    padding: '44px 16px 0 4px',
    color: theme.palette.type === 'dark' ? theme.palette.common.white : 'rgba(0, 0, 0, 0.38)',
    textTransform: 'uppercase',
    fontFamily: 'Maven Pro,sans-serif',
    fontWeight: 600
  },
  title: {
    fontSize: '16px',
    fontFamily: 'Maven Pro,sans-serif',
    fontWeight: 600
  }
});

class Sidebar extends Component {
  render() {
    const { classes, ...rest } = this.props;

    return (
      <div className={classes.root}>
        <h6 className={classes.title}>groups</h6>
        <ul>
          <SidebarContent {...rest} />
        </ul>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  activeLevel: PropTypes.string.isRequired,
  setLevel: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default withStyles(styles)(Sidebar);
