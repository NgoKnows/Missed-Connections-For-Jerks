import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'

import FeedEvent from './FeedEvent.es6'

export default class Feed extends Component {
    render() {
        const { handleForwardArrowClick, handleBackArrowClick, page, events } = this.props;

        return (
            <div style={STYLES.container}>
                <h1 style={STYLES.header}>Recent assholes:</h1>
                <div style={STYLES.feedWrapper}>
                    {this._getFeedEvents()}
                </div>
                <div style={STYLES.arrowWrapper}>
                    {page !== 1 ?
                        <i onClick={handleBackArrowClick}
                           style={STYLES.arrow}
                           className="fa fa-arrow-left"
                        /> : null}
                    {page * 6 <= events.size ?
                        <i onClick={handleForwardArrowClick}
                           style={STYLES.arrow}
                           className="fa fa-arrow-right"
                        /> : null}
                </div>
            </div>
        );
    }

    _getFeedEvents() {
        const { events, handleEventClick, page } = this.props;

        return events.slice((page - 1) * 6, page * 6).map((event) => {
           return (
               <FeedEvent
                   key={event.id}
                   event={event}
                   handleClick={handleEventClick.bind(this, event, event.id)}
               />
           )
        })
    }
}

const STYLES = {
    container: {
        backgroundColor : 'rgba(236, 240, 241, 0.75)',
        boxSizing       : 'border-box',
        display         : 'flex',
        flexDirection   : 'column',
        height          : '100vh',
        padding         : '1rem',
        width           : '20vw'
    },

    feedWrapper: {
        boxSizing : 'border-box',
        overflowY  : 'scroll',
    },

    header: {
        color   : 'rgb(178,89,79)',
        display : 'absolute'

    },

    arrow: {
        fontSize    : '2.25rem',
        marginRight : '1.5rem'
    },

    arrowWrapper: {
        display        : 'flex',
        flexDirection  : 'row',
        justifyContent : 'center'
    }

};

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
    })).isRequired,
    handleBackArrowClick    : PropTypes.func,
    handleEventClick        : PropTypes.func,
    handleForwardArrowClick : PropTypes.func,
    page                    : PropTypes.number
};
