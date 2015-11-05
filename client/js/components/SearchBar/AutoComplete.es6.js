import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'

import 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { VelocityTransitionGroup, velocityHelpers } from 'velocity-react'

import AutoCompleteRow from 'components/SearchBar/AutoCompleteRow'

var Animations = {
    // Register these with UI Pack so that we can use stagger later.
    In: velocityHelpers.registerEffect({
        calls: [
            [{
                transformPerspective: [ 800, 800 ],
                transformOriginX: [ '50%', '50%' ],
                transformOriginY: [ '100%', '100%' ],
                marginBottom: 0,
                opacity: 1,
                rotateX: [0, 130],
            }, 1, {
                easing: 'ease-out',
                display: 'block',
            }]
        ],
    }),

    Out: velocityHelpers.registerEffect({
        calls: [
            [{
                transformPerspective: [ 800, 800 ],
                transformOriginX: [ '50%', '50%' ],
                transformOriginY: [ '0%', '0%' ],
                marginBottom: -30,
                opacity: 0,
                rotateX: -70,
            }, 1, {
                easing: 'ease-out',
                display: 'block',
            }]
        ],
    }),
};

var enterAnimation = {
    animation: Animations.In,
    stagger: 150,
    duration: 150,
    backwards: true,
    display: 'block',
    style: {
        // Since we're staggering, we want to keep the display at "none" until Velocity runs
        // the display attribute at the start of the animation.
        display: 'none',
    },
};

var leaveAnimation = {
    animation: Animations.Out,
    stagger: 100,
    duration: 100,
    backwards: true,
};

@Radium
export default class AutoComplete extends Component {
    render() {
        const { suggestions } = this.props;

        let SearchingText = suggestions.size ? null :
            <li key={0} style={STYLES.searching}>{'Searching...'}</li>

        return (
            <div style={STYLES.container}>
                <ul style={STYLES.list}>
                    <VelocityTransitionGroup component="div" enter={enterAnimation} leave={leaveAnimation}>
                        {SearchingText}
                        {this._getRows()}
                    </VelocityTransitionGroup>
                </ul>
            </div>
        );
    }

    _getRows() {
        const { suggestions, handleClick } = this.props;

        return suggestions.map((suggestion) => {
            return (
                <AutoCompleteRow
                    key={suggestion.get('factual_id')}
                    handleClick={handleClick.bind(this, suggestion)}
                    suggestion={suggestion}
                />
            )
        })
    }
}

const STYLES = {
    list: {
        backgroundColor: 'rgba(236, 240, 241, 0.75)',
        borderRadius: '0 0 5px 5px',
        boxSizing: 'border-box',
        fontSize: '1.25rem',
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        width: '100%'
    },
    container: {
        width: '100%'
    },
    searching: {
        fontSize: '1.5rem',
        padding: '.75rem'
    }
};

AutoComplete.propTypes = {
    suggestions: ImmutablePropTypes.listOf(ImmutablePropTypes.recordOf({
        address    : PropTypes.string,
        factual_id : PropTypes.string,
        latitude   : PropTypes.number,
        locality   : PropTypes.string,
        longitude  : PropTypes.number,
        name       : PropTypes.string,
        postcode   : PropTypes.string,
        region     : PropTypes.string
    })).isRequired
};
