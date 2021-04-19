import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import {
  Divider, MenuItem, ListItemIcon, Typography, Chip
} from '@material-ui/core';
import { ArrowForwardIos } from '@material-ui/icons';

import { NotificationChip, PriorityIcon } from './components';

const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    padding: theme.spacing(1)
  },
  sla: {
    display: 'flex',
    flexFlow: 'row nowrap'
  },
  slaChip: {
    background: '#fec44c',
    border: '1px solid black',
    borderRadius: theme.spacing(0.5),
    height: 24,

    '& > span': {
      color: 'black'
    }
  },
  slaLabel: {
    padding: theme.spacing(0.2),
    paddingBottom: 0,
    paddingTop: 0,
    color: theme.palette.primary.dark,
    fontWeight: 'bolder'
  },
  slaData: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    minWidth: theme.spacing(5),
    color: grey[500]
  },
  title: {
    fontSize: 16,
    fontWeight: 'bolder',
    marginRight: theme.spacing(0.5)
  },
  actions: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  actionIcons: {
    minWidth: 0,
    border: '1px solid black',
    borderRadius: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5)
  },
  arrow: {
    alignSelf: 'center',
    minWidth: 0,
    marginLeft: 'auto',
  },
});

class Notification extends Component {
  timer = null

  componentDidMount() {
    this.timer = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  formatTime = time => {
    if (time < 0) return '0s';
    if (time < 60) return `${Math.floor(time)}s`;
    if (time < 3600) return `${Math.floor(time / 60)}m`;
    if (time < 86400) return `${Math.floor(time / 3600)}h`;
    return `${Math.floor(time / 86400)}d`;
  }

  handleClick = () => {
    const { onClick, id } = this.props;
    onClick(id);
  }

  render() {
    const {
      classes,
      summary,
      zone,
      sla,
      nextActions,
      priority,
      time,
      isLastItem
    } = this.props;

    const {
      Text, showSla, SummaryIcon, summaryIconColor
    } = summary;
    const { slaExpiry } = sla;

    return (
      <div
        onClick={this.handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={this.handleClick}
      >
        <MenuItem className={classes.container}>
          <div className={classes.sla}>
            {showSla && <Chip className={classes.slaChip} classes={{ label: classes.slaLabel }} label="SLA" />}
            <div className={classes.slaData}>
              <Typography variant="body2">{`${moment(time).clone().add(slaExpiry, 'minutes').diff(moment(), 'minutes')}m`}</Typography>
              <SummaryIcon fontSize="small" style={{ fontSize: 20, fill: summaryIconColor }} />
              <Typography variant="body2">{this.formatTime(moment().diff(moment(time), 'seconds'))}</Typography>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography className={classes.title} variant="subtitle1">{Text}</Typography>
              <PriorityIcon priority={priority} />
            </div>
            <div className={classes.actions}>
              <NotificationChip label={zone} />
              {nextActions.map(action => {
                const { SmallIcon, Name } = action;
                return (
                  <ListItemIcon key={Name} className={classes.actionIcons}>
                    {SmallIcon && <SmallIcon fontSize="small" style={{ fontSize: 20 }} />}
                  </ListItemIcon>
                );
              })}
            </div>
          </div>
          <ListItemIcon className={classes.arrow}>
            <ArrowForwardIos color="disabled" fontSize="small" style={{ fontSize: 14 }} />
          </ListItemIcon>
        </MenuItem>
        {!isLastItem && <Divider variant="inset" />}
      </div>
    );
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  summary: PropTypes.object.isRequired,
  zone: PropTypes.string.isRequired,
  sla: PropTypes.object.isRequired,
  nextActions: PropTypes.array.isRequired,
  priority: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  isLastItem: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Notification);
