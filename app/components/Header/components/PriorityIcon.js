import React, { Component } from 'react';
import classnames from 'classnames';
import { ExpandLessOutlined } from '@material-ui/icons';
import { red, yellow, green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const priorities = {
  high: 'high',
  medium: 'medium',
  low: 'low',
};

const styles = () => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    width: 20,
    height: 20,
    justifyContent: 'center',
    border: '1px solid',
    borderRadius: '50%'
  },
  arrow: {
    margin: '-5.4px'
  },
  high: {
    color: red[300]
  },
  medium: {
    color: yellow[300]
  },
  low: {
    color: green[300]
  },
});


class PriorityIcon extends Component {
  render() {
    const { priority, classes } = this.props;

    return (
      <div
        className={classnames(classes.wrapper, classes[priorities[priority]])}
      >
        <ExpandLessOutlined className={classes.arrow} fontSize="small" style={{ fontSize: 14 }} />
        {priority !== priorities.low && <ExpandLessOutlined className={classes.arrow} fontSize="small" style={{ fontSize: 14 }} />}
        {priority === priorities.high && <ExpandLessOutlined className={classes.arrow} fontSize="small" style={{ fontSize: 14 }} />}
      </div>
    );
  }
}

PriorityIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  priority: PropTypes.string.isRequired
};


export default withStyles(styles)(PriorityIcon);
