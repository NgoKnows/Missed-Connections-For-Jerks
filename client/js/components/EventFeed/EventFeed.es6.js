import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'

import Feed from './Feed.es6'

export default class EventFeed extends Component {
    render() {
        const { events } = this.props;
        return (
            <div style={STYLES}>
                <Feed events={events}/>
            </div>
        );
    }
}

const STYLES = {
    position: 'absolute',
    zIndex: 999,
    right: 0,
    height: '100%'
};

EventFeed.propTypes = {
    events: ImmutablePropTypes.listOf(ImmutablePropTypes.recordOf({
        address    : PropTypes.string,
        content    : PropTypes.string,
        factual_id : PropTypes.string,
        id         : PropTypes.string,
        latitude   : PropTypes.number,
        locality   : PropTypes.string,
        longitude  : PropTypes.number,
        place_name : PropTypes.string,
        title      : PropTypes.string,
        user       : PropTypes.string
    })).isRequired
};
