import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from 'flux/actions/actions'
import SearchBar from 'components/SearchBar/SearchBar'
import Map from 'components/Map/MyMap'

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
    render() {
        const { actions, ...other } = this.props;

        console.log(other);

        return (
            <div style={STYLES}>
                <SearchBar {...other} actions={actions}/>
                <Map {...other}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        center : state.get('center').toJS(),
        events : state.get('events').toJS(),
        suggestions : state.get('suggestions').toJS(),
        searchTerm: state.get('searchTerm'),
        zoom: state.get('zoom')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(actions, dispatch)
    }
}

App.propTypes = {
    searchSuggestions : PropTypes.arrayOf(PropTypes.object),
    searchTerm: PropTypes.string
};

const STYLES = {
};
