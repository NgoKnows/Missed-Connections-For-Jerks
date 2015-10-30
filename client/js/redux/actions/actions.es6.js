import { SET_SEARCH_TERM, SET_SUGGESTIONS } from '../constants/constants.es6'
import Immutable from 'immutable'
import request from 'superagent-bluebird-promise'

//import

export function setSearchTerm(term) {
    return {
        type: SET_SEARCH_TERM,
        term
    }
}

export function setSuggestions(suggestions) {
    return {
        type: SET_SUGGESTIONS,
        suggestions
    }
}

export function fetchSuggestions(searchTerm) {
    return (dispatch, getState) => {
        dispatch(setSearchTerm(searchTerm))

        setTimeout(() => {
            let currentSearchTerm = getState().get('searchTerm');

            if  (searchTerm.length < 1) {
                dispatch(setSuggestions([]));
            }
            //only make api call if still searching for same term
            else if (currentSearchTerm === searchTerm) {
                console.log('make api call')
                request
                    .get(`/api/suggestions/${currentSearchTerm}`)
                    .send(searchTerm)
                    .then((res) => dispatch(setSuggestions(res.body)))
            }
        }, 500)
    }
}
