import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'

import AutoComplete from 'components/SearchBar/AutoComplete'
import SearchImage from 'components/SearchBar/SearchImage'
import SearchInput from 'components/SearchBar/SearchInput'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {focus: true};
    }

    render() {
        const { actions, suggestions, searchTerm } = this.props;
        const { focus } = this.state;


        return (
            <div style={STYLES.container}>
                <div style={STYLES.wrapper}>
                    <SearchImage />
                    <SearchInput
                        handleBlur={() => this.setState({focus: true})}
                        handleChange={(event) => actions.fetchSuggestions(event.target.value)}
                        handleFocus={() => this.setState({focus: true})}
                        placeholderText="Where was this asshole?"
                        searchTerm={searchTerm}
                    />
                    {focus ?
                        <AutoComplete handleClick={actions.goToPlace}
                                      suggestions={suggestions}
                        /> : null}
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
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

const STYLES = {
    container : {
        display    : 'inline-block',
        left       : '50%',
        marginLeft : '-15rem',
        marginTop  : '1rem',
        position   : 'absolute',
        zIndex     : 999
    },

    wrapper : {
        position : 'relative',
        width    : '30rem'
    }
}
