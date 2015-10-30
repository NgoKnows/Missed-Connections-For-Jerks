import React, { Component, PropTypes } from 'react';
import Radium from 'radium'
import { noop } from 'lodash'

@Radium
export default class SearchInput extends Component {
    render() {
        const { placeholderText, handleFocus, handleBlur, handleChange, searchTerm } = this.props;

        return (
            <input
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder={placeholderText}
                style={STYLES}
                type="search"
                value={searchTerm}
            />
        );
    }
}

SearchInput.propTypes = {
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    handleFocus: PropTypes.func,
    placeholderText: PropTypes.string,
    searchTerm: PropTypes.string
};

SearchInput.defaultProps = {
    handleBlur: noop,
    handleChange: noop,
    handleFocus: noop,
    placeholderText: 'Search here!',
    searchTerm: ''
};

const STYLES = {
    backgroundColor: 'lightgrey',
    border: 0,
    borderRadius: '5px',
    boxSizing: 'border-box',
    fontSize: '1.5rem',
    opacity: 0.5,
    outline: 0,
    padding: '0.5rem 2.5rem',
    width: 'inherit',
    ':focus': {
        outline: 'none',
        borderRadius: '5px 5px 0 0'
    }
};

