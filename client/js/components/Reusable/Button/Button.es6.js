import React, { Component, PropTypes } from 'react';
import Radium from 'radium'
import { noop } from 'lodash'

@Radium
export default class Button extends Component {
    render() {
        const { disabled, handleBlur, handleClick, handleFocus, text, type } = this.props;

        return (
            <button style={[STYLES['base'], STYLES[type]]}
                    disabled={disabled}
                    onBlur={handleBlur}
                    onClick={handleClick}
                    onFocus={handleFocus}>
                {text}
            </button>
        );
    }
}

const STYLES = {
    base : {
        border       : 'none',
        borderRadius : '7px',
        color        : 'white',
        margin       : '5rem',
        padding      : '0.75rem 0.75rem',
        ':hover' : {
            filter  : 'grayscale(20%)',
            opacity : 0.9
        }
    },

    primary : {
        backgroundColor : 'rgba(52, 152, 219,1.0)'
    },

    secondary : {
        backgroundColor : 'rgba(52, 152, 219,1.0)'
    }
};

Button.propTypes = {
    disabled    : PropTypes.bool,
    handleBlur  : PropTypes.func,
    handleClick : PropTypes.func,
    handleFocus : PropTypes.func,
    text        : PropTypes.string,
    type        : PropTypes.string
};

Button.defaultProps = {
    disabled    : false,
    handleClick : noop,
    handleFocus : noop,
    handleBlur  : noop,
    text        : 'Add to Cart',
    type        : 'primary'
};
