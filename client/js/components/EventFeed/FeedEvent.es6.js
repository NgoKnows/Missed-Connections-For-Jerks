import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'

@Radium
export default class FeedEvent extends Component {
    render() {
        const { event, handleClick } = this.props;

        return (
            <div style={STYLES.event}
                 onClick={handleClick}>
                <h2 style={STYLES.title}>{event.title}</h2>
                <h3 style={STYLES.place}>{`${event.place_name}, ${event.locality}`}</h3>
                <h4 style={STYLES.date}>{event.date.fromNow()}</h4>
            </div>
        );
    }
}

const STYLES = {
    event : {
        marginBottom : '1rem',
        ':hover': {
            cursor         : 'pointer',
            opacity        : 0.55,
            textDecoration : 'underline'
        }
    },
    title: {
        margin : 0
    },

    place: {
        color  : 'grey',
        margin : 0
    },

    date: {
        color : 'grey',
        margin: 0
    }
}

FeedEvent.propTypes = {
    event: ImmutablePropTypes.recordOf({
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
    }).isRequired,
    handleClick: PropTypes.func
};
