import React, { Component, PropTypes } from 'react';
import Radium from 'radium'
import { noop } from 'lodash'

@Radium
export default class Input extends Component {
    render() {
        const { disabled, handleChange, handleClick, name,
            placeholder, readOnly, type, value} = this.props;

        return (
            <input style={STYLES}
                   disabled={disabled}
                   onChange={handleChange}
                   onClick={handleClick}
                   name={name}
                   placeholder={placeholder}
                   readOnly={readOnly}
                   type={type}
                   value={value}
            />
        );
    }
}

const STYLES = {};

Input.propTypes = {
    disabled     : PropTypes.bool,
    handleChange : PropTypes.func,
    handleClick  : PropTypes.func,
    name         : PropTypes.string,
    placeholder  : PropTypes.string,
    readOnly     : PropTypes.bool,
    type         : PropTypes.oneOf(['number', 'password', 'search', 'tel', 'text', 'url']),
    value        : PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Input.defaultProps = {
    disabled     : false,
    handleChange : noop,
    handleClick  : noop,
    name         : '',
    placeholder  : '',
    readOnly     : false,
    type         : 'text',
    value        : ''
};
