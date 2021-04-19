import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import {
  Menu, Tabs, Tab, Typography, Chip
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';

import Notification from './Notification';
import NotificationCard from './NotificationCard';

const styles = theme => ({
  container: {
    top: '36px !important',
    '& ul': {
      padding: 0
    },
    '& li': {
      height: 'auto',
      '& h3': {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    }
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    marginTop: '-8px'
  },
  title: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexFlow: 'row nowrap',
    color: theme.palette.common.white,
    fontSize: 18,
    fontWeight: theme.typography.fontWeightMedium
  },
  chip: {
    borderRadius: theme.spacing(1),
    marginLeft: theme.spacing(1),
    span: {
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  high: {
    background: red[500]
  },
  low: {
    background: green[400],
  },
  tabs: {
    borderRadius: 0,
    '&:nth-child(2) > div:nth-child(1) > div:nth-child(1)': {
      paddingLeft: theme.spacing(2),
      borderBottom: `4px solid ${theme.palette.secondary.light}`
    }
  },
  tabsIndicator: {
    background: green[400]
  },
  tab: {
    minWidth: 0
  },
  detailed: {
    display: 'flex'
  },
  summary: {
    position: 'relative',

    '&::after': {
      display: 'block',
      position: 'absolute',
      content: '""',
      border: 'none',
      transition: 'borderBottomWidth 0.4s ease-out',
      width: '100%'
    },

    '&:hover': {
      '&::after': {
        borderBottom: '1px solid #FFFFFF'
      }
    }
  }
});

const tabs = {
  actions: 'Actions',
  reports: 'Reports',
  updates: 'Updates',
};

class NotificationsMenu extends Component {
  state = {
    currentTabIdx: tabs.actions,
    openNotification: null
  };

  handleTabSwitch = (evt, newValue) => {
    this.setState({ currentTabIdx: newValue });
  }

  openNotification = id => {
    this.setState({ openNotification: id });
  }

  closeNotification = () => {
    this.setState({ openNotification: null });
  }

  render() {
    const {
      classes, anchorEl, openMenu, onClose, notifications
    } = this.props;
    const { highPriorityNotificationsAmount, lowPriorityNotificationsAmount, items } = notifications;
    const { currentTabIdx, openNotification } = this.state;

    return (
      <Menu
        id="menu-notification"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={classes.container}
        PaperProps={{
          style: {
            width: 350
          }
        }}
        open={openMenu === 'notification'}
        onClose={onClose}
      >
        <div className={classes.header}>
          <div className={classes.title}>
            <Typography variant="title">User Notifications</Typography>
            <Chip
              label={`${highPriorityNotificationsAmount} New`}
              className={classes.chip}
              color="primary"
              classes={{ colorPrimary: classes.high }}
            />
            <Chip
              label={`${lowPriorityNotificationsAmount} High`}
              className={classes.chip}
              color="secondary"
              classes={{ colorSecondary: classes.low }}
            />
          </div>
          <Tabs
            value={currentTabIdx}
            onChange={this.handleTabSwitch}
            className={classes.tabs}
            classes={{ indicator: classes.tabsIndicator }}
            aria-label="notifications tabs"
          >
            {openNotification
              ? (
                <Tab
                  className={classes.tab}
                  label={(
                    <div className={classes.detailed}>
                      <div
                        onClick={this.closeNotification}
                        tabIndex={0}
                        role="button"
                        onKeyDown={this.closeNotification}
                        className={classes.summary}
                      >
                        summary
                      </div>
                      <ChevronRight />
                      {`${openNotification} details`}
                    </div>
                  )}
                  value="Actions"
                />
              ) : Object.keys(tabs).map(key => {
                const tab = tabs[key];
                return <Tab key={key} className={classes.tab} label={tab} value={tab} />;
              })
            }
          </Tabs>
        </div>
        {openNotification
          ? <NotificationCard {...items.find(item => item.id === openNotification)} />
          : items && items.length && items
            .filter((notification) => {
              const currentTab = tabs[currentTabIdx.toLowerCase()];
              return notification.type === currentTab;
            })
            .map((notification, idx, filteredNotifications) => (
              <Notification
                key={notification.id}
                {...notification}
                isLastItem={filteredNotifications.length - 1 === idx}
                onClick={this.openNotification}
              />
            ))
        }
      </Menu>
    );
  }
}

NotificationsMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  anchorEl: PropTypes.object.isRequired,
  openMenu: PropTypes.string.isRequired,
  notifications: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(NotificationsMenu);
