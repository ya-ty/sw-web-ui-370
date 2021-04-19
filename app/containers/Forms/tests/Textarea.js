import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'debounce'; // < 1kb payload overhead when lodash/debounce is > 3kb.
import EventListener from 'react-event-listener';
import withStyles from '@material-ui/core/styles/withStyles';
import { setRef } from '@material-ui/core/utils/reactHelpers';

const ROWS_HEIGHT = 19;

export const styles = {
  /* Styles applied to the root element. */
  root: {
    position: 'relative', // because the shadow has position: 'absolute',
    width: '100%',
  },
  textarea: {
    width: '100%',
    height: '100%',
    resize: 'none',
    font: 'inherit',
    padding: 0,
    cursor: 'inherit',
    boxSizing: 'border-box',
    lineHeight: 'inherit',
    border: 'none',
    outline: 'none',
    background: 'transparent',
  },
  shadow: {
    // Overflow also needed to here to remove the extra row
    // added to textareas in Firefox.
    overflow: 'hidden',
    // Visibility needed to hide the extra text area on iPads
    visibility: 'hidden',
    position: 'absolute',
    height: 'auto',
    whiteSpace: 'pre-wrap',
  },
};

/**
 * @ignore - internal component.
 */
class Textarea extends React.Component {
  constructor(props) {
    super();
    this.isControlled = props.value != null;
    // <Input> expects the components it renders to respond to 'value'
    // so that it can check whether they are filled.
    this.value = props.value || props.defaultValue || '';
    this.state = {
      height: Number(props.rows) * ROWS_HEIGHT,
    };

    if (typeof window !== 'undefined') {
      this.handleResize = debounce(() => {
        this.syncHeightWithShadow();
      }, 166); // Corresponds to 10 frames at 60 Hz.
    }
  }

  componentDidMount() {
    this.syncHeightWithShadow();
  }

  componentDidUpdate() {
    this.syncHeightWithShadow();
  }

  componentWillUnmount() {
    this.handleResize.clear();
  }

  handleRefInput = ref => {
    const { textareaRef } = this.props;
    this.inputRef = ref;

    setRef(textareaRef, ref);
  };

  handleRefSinglelineShadow = ref => {
    this.singlelineShadowRef = ref;
  };

  handleRefShadow = ref => {
    this.shadowRef = ref;
  };

  handleChange = event => {
    const { onChange } = this.props;
    this.value = event.target.value;

    if (!this.isControlled) {
      // The component is not controlled, we need to update the shallow value.
      this.shadowRef.value = this.value;
      this.syncHeightWithShadow();
    }

    if (onChange) {
      onChange(event);
    }
  };

  syncHeightWithShadow() {
    const { value, rowsMax, rows } = this.props;
    const { height } = this.state;

    // Guarding for **broken** shallow rendering method that call componentDidMount
    // but doesn't handle refs correctly.
    // To remove once the shallow rendering has been fixed.
    if (!this.shadowRef) {
      return;
    }

    if (this.isControlled) {
      // The component is controlled, we need to update the shallow value.
      this.shadowRef.value = value == null ? '' : String(value);
    }

    let lineHeight = this.singlelineShadowRef.scrollHeight;
    // The Textarea might not be visible (p.ex: display: none).
    // In this case, the layout values read from the DOM will be 0.
    lineHeight = lineHeight === 0 ? ROWS_HEIGHT : lineHeight;

    let newHeight = this.shadowRef.scrollHeight;

    // Guarding for jsdom, where scrollHeight isn't present.
    // See https://github.com/tmpvar/jsdom/issues/1013
    if (newHeight === undefined) {
      return;
    }

    if (Number(rowsMax) >= Number(rows)) {
      newHeight = Math.min(Number(rowsMax) * lineHeight, newHeight);
    }

    newHeight = Math.max(newHeight, lineHeight);

    // Need a large enough different to update the height.
    // This prevents infinite rendering loop.
    if (Math.abs(height - newHeight) > 1) {
      this.setState({
        height: newHeight,
      });
    }
  }

  render() {
    const {
      classes,
      className,
      defaultValue,
      onChange,
      rows,
      rowsMax,
      style,
      textareaRef,
      value,
      ...other
    } = this.props;
    const { height } = this.state;

    return (
      <div className={classes.root}>
        <EventListener target="window" onResize={this.handleResize} />
        <textarea
          aria-hidden="true"
          className={classnames(classes.textarea, classes.shadow)}
          readOnly
          ref={this.handleRefSinglelineShadow}
          rows="1"
          tabIndex={-1}
          value=""
        />
        <textarea
          aria-hidden="true"
          className={classnames(classes.textarea, classes.shadow)}
          defaultValue={defaultValue}
          readOnly
          ref={this.handleRefShadow}
          rows={rows}
          tabIndex={-1}
          value={value}
        />
        <textarea
          rows={rows}
          className={classnames(classes.textarea, className)}
          defaultValue={defaultValue}
          value={value}
          onChange={this.handleChange}
          ref={this.handleRefInput}
          style={{ height, ...style }}
          {...other}
        />
      </div>
    );
  }
}

Textarea.propTypes = {
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
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /**
   * @ignore
   */
  disabled: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /**
   * @ignore
   */
  style: PropTypes.object.isRequired,
  /**
   * Use that property to pass a ref callback to the native textarea element.
   */
  textareaRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  /**
   * @ignore
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Textarea.defaultProps = {
  rows: 1,
};

export default withStyles(styles, { name: 'MuiPrivateTextarea' })(Textarea);
