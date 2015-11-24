import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from 'flux/actions/actions'

class List extends Component {
    render() {
        const { actions, ...other } = this.props;

        return (
            <div style={STYLES}>
                <h1>Hiii</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        events      : state.get('events'),
        loading     : state.get('loading'),
        ui          : state.get('ui'),
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(actions, dispatch)
    };
};

List.propTypes = {
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
    loading    : PropTypes.bool,
    ui         : ImmutablePropTypes.map,
};

const STYLES = {};

export default connect(mapStateToProps, mapDispatchToProps)(List)
