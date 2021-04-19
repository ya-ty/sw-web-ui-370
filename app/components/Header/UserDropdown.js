import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  Badge, Divider, Menu, MenuItem, ListItemIcon
} from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';

import link from 'enl-api/ui/link';
import messages from './messages';

class UserDropdown extends Component {
  render() {
    const {
      signOut, anchorEl, openMenu, onClose
    } = this.props;

    return (
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openMenu === 'user-setting'}
        onClose={onClose}
      >
        <MenuItem onClick={onClose} component={Link} to={link.profile}>
          <FormattedMessage {...messages.profile} />
        </MenuItem>
        <MenuItem onClick={onClose} component={Link} to={link.task}>
          <FormattedMessage {...messages.task} />
        </MenuItem>
        <MenuItem onClick={onClose} component={Link} to={link.email}>
          <FormattedMessage {...messages.email} />
          <ListItemIcon>
            <Badge badgeContent={2} color="secondary">&nbsp;</Badge>
          </ListItemIcon>
        </MenuItem>
        <Divider />
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <FormattedMessage {...messages.logout} />
        </MenuItem>
      </Menu>
    );
  }
}

UserDropdown.propTypes = {
  signOut: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  anchorEl: PropTypes.object.isRequired,
  openMenu: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default injectIntl(UserDropdown);
