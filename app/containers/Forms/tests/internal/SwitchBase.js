// @inheritedComponent IconButton

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import withFormControlContext from '../withFormControlContext';

export const styles = {
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'none',
    '&:hover': {
      // Disable the hover effect for the IconButton.
      backgroundColor: 'transparent',
    },
  },
  checked: {},
  disabled: {},
  input: {
    cursor: 'inherit',
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
  },
};

/**
 * @ignore - internal component.
 */
class SwitchBase extends React.Component {
  constructor(props) {
    super();
    this.isControlled = props.checked != null;
    this.state = {};
    if (!this.isControlled) {
      // not controlled, use internal state
      this.state.checked = props.defaultChecked !== undefined ? props.defaultChecked : false;
    }
  }

  handleFocus = event => {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(event);
    }

    const { muiFormControl } = this.props;
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };

  handleBlur = event => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(event);
    }

    const { muiFormControl } = this.props;
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };

  handleInputChange = event => {
    const { onChange } = this.props;
    const { checked } = event.target;

    if (!this.isControlled) {
      this.setState({ checked });
    }

    if (onChange) {
      onChange(event, checked);
    }
  };

  render() {
    const {
      autoFocus,
      checked: checkedProp,
      checkedIcon,
      classes,
      className: classNameProp,
      defaultChecked,
      disabled: disabledProp,
      icon,
      id,
      inputProps,
      inputRef,
      muiFormControl,
      name,
      onBlur,
      onChange,
      onFocus,
      readOnly,
      required,
      tabIndex,
      type,
      value,
      ...other
    } = this.props;

    let disabled = disabledProp;

    if (muiFormControl) {
      if (typeof disabled === 'undefined') {
        // eslint-disable-next-line prefer-destructuring
        disabled = muiFormControl.disabled;
      }
    }

    // eslint-disable-next-line react/destructuring-assignment
    const checked = this.isControlled ? checkedProp : this.state.checked;
    const hasLabelFor = type === 'checkbox' || type === 'radio';

    return (
      <IconButton
        component="span"
        className={classNames(
          classes.root,
          {
            [classes.checked]: checked,
            [classes.disabled]: disabled,
          },
          classNameProp,
        )}
        disabled={disabled}
        tabIndex={null}
        role={undefined}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...other}
      >
        {checked ? checkedIcon : icon}
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          checked={checkedProp}
          defaultChecked={defaultChecked}
          className={classes.input}
          disabled={disabled}
          id={hasLabelFor && id}
          name={name}
          onChange={this.handleInputChange}
          readOnly={readOnly}
          ref={inputRef}
          required={required}
          tabIndex={tabIndex}
          type={type}
          value={value}
          {...inputProps}
        />
      </IconButton>
    );
  }
}

// NB: If changed, please update Checkbox, Switch and Radio
// so that the API documentation is updated.
SwitchBase.propTypes = {
  /**
   * If `true`, the input will be focused during the first mount.
   */
  autoFocus: PropTypes.bool.isRequired,
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string.isRequired,
  /**
   * @ignore
   */
  defaultChecked: PropTypes.bool.isRequired,
  /**
   * If `true`, the switch will be disabled.
   */
  disabled: PropTypes.bool.isRequired,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool.isRequired,
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node.isRequired,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string.isRequired,
  /**
   * Attributes applied to the `input` element.
   */
  inputProps: PropTypes.object.isRequired,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  /**
   * @ignore
   */
  muiFormControl: PropTypes.object.isRequired,
  /*
   * @ignore
   */
  name: PropTypes.string.isRequired,
  /**
   * @ignore
   */
  onBlur: PropTypes.func.isRequired,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.checked`.
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  onFocus: PropTypes.func.isRequired,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool.isRequired,
  /**
   * If `true`, the input will be required.
   */
  required: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * The input component property `type`.
   */
  type: PropTypes.string.isRequired,
  /**
   * The value of the component.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
};

export default withStyles(styles, { name: 'MuiPrivateSwitchBase' })(
  withFormControlContext(SwitchBase),
);
