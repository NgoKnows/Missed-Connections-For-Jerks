import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from 'flux/actions/actions'
import SearchBar from 'components/SearchBar/SearchBar'
import Map from 'components/Map/MyMap'
import EventFeed from 'components/EventFeed/EventFeed'

class App extends Component {
    componentDidMount() {
        this.props.actions.fetchEvents();
    }

    render() {
        const { actions, ...other } = this.props;

        return (
            <div style={STYLES}>
                <SearchBar {...other} actions={actions} />
                <EventFeed {...other} actions={actions} />
                <Map {...other} actions={actions} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        center      : state.get('center'),
        events      : state.get('events'),
        searchTerm  : state.get('searchTerm'),
        suggestions : state.get('suggestions'),
        zoom        : state.get('zoom')
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(actions, dispatch)
    };
};

App.propTypes = {
    center : ImmutablePropTypes.listOf(PropTypes.number).isRequired,
    events : ImmutablePropTypes.listOf(ImmutablePropTypes.recordOf({
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
    suggestions : ImmutablePropTypes.listOf(ImmutablePropTypes.recordOf({
        address    : PropTypes.string,
        factual_id : PropTypes.string,
        latitude   : PropTypes.number,
        locality   : PropTypes.string,
        longitude  : PropTypes.number,
        name       : PropTypes.string,
        postcode   : PropTypes.string,
        region     : PropTypes.string
    })).isRequired,
    searchTerm : PropTypes.string.isRequired,
    zoom       : PropTypes.number.isRequired
};

const STYLES = {};

export default connect(mapStateToProps, mapDispatchToProps)(App)
