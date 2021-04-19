import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar, IconButton, Button, Badge
} from '@material-ui/core';
import { NotificationsActiveOutlined } from '@material-ui/icons';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { connect } from 'react-redux';

import { getNotifs } from 'enl-redux/actions/notifActions';
import NotificationsMenu from './NotificationsMenu';
import UserDropdown from './UserDropdown';

const styles = theme => ({
  dark: {},
  light: {},
  icon: {
    '& svg': {
      width: 28,
      height: 28,
    },
    '&$light': {
      '& svg': {
        fill: fade(theme.palette.text.hint, 0.48),
      }
    },
  },
});

class UserMenu extends Component {
  state = {
    anchorEl: null,
    openMenu: null
  };

  componentDidMount() {
    const { getNotifsFn } = this.props;
    getNotifsFn();
  }

  handleMenu = menu => (event) => {
    const { openMenu } = this.state;
    const { notifications } = this.props;

    if (notifications.notifications) {
      this.setState({
        openMenu: openMenu === menu ? null : menu,
        anchorEl: event.currentTarget
      });
    }
  };

  handleClose = () => {
    this.setState({ anchorEl: null, openMenu: null });
  };

  render() {
    const {
      classes, dark, signOut, avatar, notifications,
    } = this.props;
    const { anchorEl, openMenu } = this.state;
    const { highPriorityNotificationsAmount, lowPriorityNotificationsAmount } = notifications;

    return (
      <div>
        <IconButton
          aria-haspopup="true"
          onClick={this.handleMenu('notification')}
          color="inherit"
          className={classNames(classes.icon, dark ? classes.dark : classes.light)}
        >
          <Badge
            badgeContent={highPriorityNotificationsAmount}
            color="error"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Badge badgeContent={lowPriorityNotificationsAmount} color="secondary">
              <NotificationsActiveOutlined />
            </Badge>
          </Badge>
        </IconButton>
        <NotificationsMenu anchorEl={anchorEl} openMenu={openMenu} onClose={this.handleClose} notifications={notifications} />
        <Button onClick={this.handleMenu('user-setting')}>
          <Avatar
            alt="avatar"
            src={avatar}
          />
        </Button>
        <UserDropdown
          anchorEl={anchorEl}
          openMenu={openMenu}
          onClose={this.handleClose}
          signOut={signOut}
        />
      </div>
    );
  }
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  getNotifsFn: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  notifications: PropTypes.array.isRequired,
  dark: PropTypes.bool,
};

UserMenu.defaultProps = {
  dark: false
};

const reducer = 'notif';
const mapStateToProps = state => ({
  notifications: state.get(reducer).notifications
});

const mapDispatchToProps = {
  getNotifsFn: getNotifs
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserMenu));
