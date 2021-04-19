import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MainFilter from '../FilterPanel/MainFilter';
import messages from './messages';
import styles from './todo-jss';

const data = [
  {
    filter: '',
    message: messages.view_all
  },
  {
    filter: 'active',
    message: messages.active
  },
  {
    filter: 'completed',
    message: messages.completed
  }
];

class TaskFilters extends React.Component {
  render() {
    const { classes, filter, type } = this.props;
    return (
      <div className={classes.taskFilter}>
        <MainFilter data={data} filter={filter} type={type} />
      </div>
    );
  }
}

TaskFilters.propTypes = {
  classes: PropTypes.object.isRequired,
  filter: PropTypes.func.isRequired,
  type: PropTypes.string
};

TaskFilters.defaultProps = {
  type: ''
};

export default withStyles(styles)(TaskFilters);
