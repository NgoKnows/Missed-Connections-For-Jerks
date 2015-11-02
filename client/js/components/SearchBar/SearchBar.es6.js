import React, { Component, PropTypes } from 'react';
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
        let { focus } = this.state;

        return (
            <div style={STYLES.container}>
                <div style={STYLES.wrapper}>
                    <SearchImage />
                    <SearchInput
                        handleFocus={() => this.setState({focus: true})}
                        handleBlur={() => this.setState({focus: true})}
                        handleChange={(event) => actions.fetchSuggestions(event.target.value)}
                        placeholderText="Where was this asshole?"
                        searchTerm={searchTerm}
                    />
                    {focus ? <AutoComplete handleClick={(lat, long) => actions.goToPlace(lat, long)}
                                           suggestions={suggestions}
                    /> : null}
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        address: PropTypes.string,
    })).isRequired
};

SearchBar.defaultProps = {};

const STYLES = {
    container: {
        display: 'inline-block',
        position: 'absolute',
        left: '50%',
        marginLeft: '-15rem',
        marginTop: '1rem',
        zIndex: 999
    },
    wrapper: {
        position: 'relative',
        width: '30rem'
    }
}
