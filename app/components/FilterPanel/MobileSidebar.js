import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import icons from 'enl-api/images/icons';

import SidebarContent from './SidebarContent'

const styles = theme => ({
  button: {
    paddingRight: 0
  },
  buttonIcon: {
    width: '17px',
    height: '17px',
    fontSize: '10px',
    marginRight: theme.spacing(0.5),
    color: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.68)' : 'rgba(0, 0, 0, 0.68)'
  },
  title: {
    fontSize: '16px',
    fontFamily: 'Maven Pro,sans-serif',
    fontWeight: 600,
    textTransform: 'uppercase'
  },
  drawer: {
    background: theme.palette.type === 'dark' ? darken(theme.palette.primary.main, 0.6) : theme.palette.primary.light,
    height: '100%',
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    paddingTop: theme.spacing(2),
    color: theme.palette.type === 'dark' ? theme.palette.common.white : 'rgba(0, 0, 0, 0.38)',
    textTransform: 'uppercase',
    fontFamily: 'Maven Pro,sans-serif'
  },
});

class MobileSidebar extends React.Component {
  state = {
    open: false
  }

  toggleDrawer = newOpen => {
    const { open } = this.state;

    if (newOpen !== undefined) {
      this.setState({ open: newOpen });
    } else {
      this.setState({ open: !open });
    }
  };

  render() {
    const { open } = this.state;
    const { classes, ...rest } = this.props;

    return (
      <div className={classes.root}>
        <Button onClick={this.toggleDrawer} className={classes.button}>
          <SVG src={icons.floor} alt="floor" className={classes.buttonIcon} />
        </Button>
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
        >
          <div className={classes.drawer}>
            <h6 className={classes.title}>groups</h6>
            <ul>
              <SidebarContent {...rest} />
            </ul>
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

MobileSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  activeLevel: PropTypes.string.isRequired,
  setLevel: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default withStyles(styles)(MobileSidebar);
