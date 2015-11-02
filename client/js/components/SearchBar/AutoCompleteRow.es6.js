import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

@Radium
export default class AutoCompleteRow extends Component {
    render() {
        const { suggestion, handleClick } = this.props;

        return (
            <li style={STYLES.row} onClick={() => handleClick(suggestion.latitude, suggestion.longitude)}>
                <div style={STYLES.result}>{suggestion.name} </div>
                <div style={[STYLES.result, STYLES.address]}>{suggestion.address || suggestion.locality }</div>
            </li>
        );
    }
}

AutoCompleteRow.propTypes = {
    suggestion: PropTypes.arrayOf(PropTypes.object)
};

const STYLES = {
    result: {
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    row: {
        padding: '.5rem 0.75rem',
        whiteSpace: 'nowrap',
        ':hover': {
            cursor: 'pointer',
            opacity: 0.55
        }
    },
    address: {
        color: 'grey'
    },
}
