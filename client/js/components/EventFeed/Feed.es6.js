import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'

import FeedEvent from './FeedEvent.es6'

export default class Feed extends Component {
    render() {
        return (
            <div style={STYLES.container}>
                <h1 style={STYLES.header}>Recent assholes:</h1>
                {this._getFeedEvents()}
            </div>
        );
    }

    _getFeedEvents() {
        const { events } = this.props;

        return events.map((event, index) => {
           return <FeedEvent key={event.id} event={event}/>
        })
    }
}

const STYLES = {
    container: {
        padding: '1rem',
        width: '16rem',
        height: '100%',
        backgroundColor: 'rgba(236, 240, 241, 0.75)'
    },

    header: {
        color: 'rgb(178,89,79)',
        margin: '0.2rem 0 0.75rem 0'
    }
}

Feed.propTypes = {
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
