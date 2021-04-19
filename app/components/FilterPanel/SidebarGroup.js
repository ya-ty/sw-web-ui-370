import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  group: {
    fontSize: '13px',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',

    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(0.8),
      paddingBottom: theme.spacing(0.8),
      borderBottom: theme.palette.type === 'dark' ? '1px solid rgba(255, 255, 255, 0.68)' : '1px solid rgba(0, 0, 0, 0.68)',
    },
  },
  open: {},
  content: {
    maxHeight: 0,
    overflowY: 'hidden',
    transition: 'opacity 0.2s ease-out, max-height 0.2s ease-out',
    display: 'flex',
    flexDirection: 'column',

    '&$open': {
      maxHeight: '10000px',
      height: 'auto'
    }
  },
  groupIcon: {
    width: '20px',
    height: '25px',
    fontSize: '10px',
    marginRight: theme.spacing(0.5),
    color: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.68)' : 'rgba(0, 0, 0, 0.68)'
  },
  groupTitle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-out',

    [theme.breakpoints.down('sm')]: {
      marginBottom: 0
    },
  },
  activeGroupTitle: {
    color: theme.palette.secondary.main,

    '& svg': {
      color: theme.palette.secondary.main
    }
  },
});

class SidebarGroup extends Component {
  state = {
    open: false,
    active: false
  };

  componentDidMount() {
    const { group } = this.props;
    this.isActive(group)
  }

  componentDidUpdate (prevProps) {
    const { activeLevel, group } = this.props;

    if (activeLevel !== prevProps.activeLevel) {
      this.setState({ active: false, filtered: true }, () => {
        this.isActive(group)
      })
    }
  }

  handleClick = () => {
    const { onClick, group } = this.props

    if (onClick) {
      onClick(group)
    } else {
      this.toggleGroup()
    }
  }

  toggleGroup = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  isActive = group => {
    const { activeLevel } = this.props

    if (group.id === activeLevel) {
      this.setState({ active: true })
    } else if (group.subgroups) {
      group.subgroups.forEach(subgroup => {
        this.isActive(subgroup)
      })
    }
  }

  render() {
    const { group, classes, children } = this.props;
    const { open, active } = this.state;

    return (
      <div className={classes.group}>
        <div
          role="button"
          tabIndex={0}
          onClick={this.handleClick}
          onKeyDown={this.handleClick}
          className={classnames(classes.groupTitle, active ? classes.activeGroupTitle : '')}
        >
          <SVG src={group.icon} alt={group.title} className={classes.groupIcon} />
          {group.title}
        </div>
        <div className={classnames(classes.content, open && classes.open)}>
          {children}
        </div>
      </div>
    );
  }
}

SidebarGroup.propTypes = {
  group: PropTypes.object.isRequired,
  activeLevel: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default withStyles(styles)(SidebarGroup);
