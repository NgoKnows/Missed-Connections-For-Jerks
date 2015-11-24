import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import * as actions from 'flux/actions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BottomNavBar from 'components/Navigation/BottomNavBar/BottomNavBar'

class App extends Component {
    componentDidMount() {
        this.props.actions.fetchEvents();
    }

    render() {
        const { actions, ...other } = this.props;

        return (
            <div style={STYLES}>
                {this.props.children}
                <BottomNavBar actions={actions}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        center      : state.getIn(['map', 'center']),
        events      : state.get('events'),
        loading     : state.get('loading'),
        searchTerm  : state.get('searchTerm'),
        suggestions : state.get('suggestions'),
        ui          : state.get('ui'),
        zoom        : state.getIn(['map', 'zoom'])
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
    loading     : PropTypes.bool,
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
    ui         : ImmutablePropTypes.map,
    zoom       : PropTypes.number.isRequired
};

const STYLES = {};

export default connect(mapStateToProps, mapDispatchToProps)(App)
