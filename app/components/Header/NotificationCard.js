import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';

import { NotificationChip, NotificationVideo } from './components';

const styles = theme => ({
  container: {
    padding: '20px 10px'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 700
  },
  fabs: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  fab: {
    textTransform: 'capitalize',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '400',
    backgroundColor: theme.palette.primary.main,
    marginRight: 13,
    marginBottom: 13
  },
  last: {
    marginRight: 0
  },
  fabRoot: {
    width: '144px !important'
  }
});

class NotificationCard extends Component {
  render() {
    const {
      classes,
      zone,
      time,
      detailed,
      successAction,
      evidence
    } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.row}>
          <NotificationChip label={moment(time).format('Do MMMM h:mm:ss A')} />
          <NotificationChip label={`Zone - ${zone}`} />
        </div>
        <div className={classes.title}>
          {detailed.Text}
        </div>
        <NotificationVideo source={evidence.FullEvidence} meta={evidence.MetaText} />
        <div className={classes.fabs}>
          {successAction.map((action, i) => (
            <Fab variant="extended" size="small" className={classnames(classes.fab, i % 2 !== 0 && classes.last)} classes={{ root: classes.fabRoot }} key={action}>
              {action}
            </Fab>
          ))}
        </div>
      </div>
    );
  }
}

NotificationCard.propTypes = {
  classes: PropTypes.object.isRequired,
  zone: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  detailed: PropTypes.object.isRequired,
  successAction: PropTypes.array.isRequired,
  evidence: PropTypes.object.isRequired
};

export default withStyles(styles)(NotificationCard);
