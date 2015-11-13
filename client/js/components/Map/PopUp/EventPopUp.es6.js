import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'

export default class EventPopUp extends Component {
    render() {
        const { event } = this.props;

        return (
            <div>
                <h2>{event.title || `That asshole @ ${event.place_name}`}</h2>
                <div>{event.content}</div>
            </div>
        );
    }
}

EventPopUp.propTypes = {
    event : ImmutablePropTypes.recordOf({
        address    : PropTypes.string,
        content    : PropTypes.string,
        factual_id : PropTypes.string,
        id         : PropTypes.string,
        latitude   : PropTypes.number,
        locality   : PropTypes.string,
        longitude  : PropTypes.number,
        place_name : PropTypes.string,
        title      : PropTypes.string,
        user       : PropTypes.string,
        blah       : PropTypes.string
    }).isRequired
};
