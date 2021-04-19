import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { injectIntl, FormattedMessage } from 'react-intl';

const styles = theme => ({
  active: {},
  filter: {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.hint,
    '& li': {
      display: 'inline-block',
      [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(2),
      },
      '& button': {
        color: theme.palette.text.hint,
        '&$active': {
          color: theme.palette.secondary.main,
        }
      }
    }
  }
});

class MainFilter extends Component {
  render() {
    const {
      filter, classes, type, data
    } = this.props;

    return (
      <ul className={classes.filter}>
        {data.map((item, index) => (
          <Fragment key={item.message.defaultMessage}>
            <li>
              <Button size="small" onClick={() => filter(item.filter)} className={type === item.filter ? classes.active : ''}>
                <FormattedMessage {...item.message} />
              </Button>
            </li>
            {index < data.length - 1 && (
              <li>/</li>
            )}
          </Fragment>
        ))}
      </ul>
    );
  }
}

MainFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  filter: PropTypes.func.isRequired,
  type: PropTypes.string
};

MainFilter.defaultProps = {
  type: ''
};

export default withStyles(styles)(injectIntl(MainFilter));
