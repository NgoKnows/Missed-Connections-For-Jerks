import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'

@Radium
export default class AutoCompleteRow extends Component {
    render() {
        const { suggestion, handleClick } = this.props;
        const { name, address, locality } = suggestion;

        return (
            <li style={STYLES.row} onClick={handleClick}>
                <div style={STYLES.result}>{name} </div>
                <div style={[STYLES.result, STYLES.address]}>{ address || locality }</div>
            </li>
        );
    }
}

AutoCompleteRow.propTypes = {
    suggestion: ImmutablePropTypes.recordOf({
        address    : PropTypes.string,
        factual_id : PropTypes.string,
        latitude   : PropTypes.number,
        locality   : PropTypes.string,
        longitude  : PropTypes.number,
        name       : PropTypes.string,
        postcode   : PropTypes.string,
        region     : PropTypes.string
    }).isRequired
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
