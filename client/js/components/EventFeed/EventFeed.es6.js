import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'

import Feed from './Feed.es6'

export default class EventFeed extends Component {
    render() {
        const { actions, events, ui } = this.props;

        return (
            <div style={STYLES}>
                <Feed events={events}
                      page={ui.get('feedPage')}
                      handleBackArrowClick={() => actions.pageBackward()}
                      handleForwardArrowClick={() => actions.pageForward()}
                      handleEventClick={(place, id) => actions.goToPlace(place, id)}/>
            </div>
        );
    }
}

const STYLES = {
    height   : '100%',
    position : 'absolute',
    right    : 0,
    zIndex   : 999
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
    })).isRequired,
    ui : ImmutablePropTypes.map
};
