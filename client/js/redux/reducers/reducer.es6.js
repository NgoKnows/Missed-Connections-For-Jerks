import { SET_SEARCH_TERM, SET_SUGGESTIONS } from '../constants/constants'
import Immutable from 'immutable'

//beginning state of app
let testState = Immutable.Map({
    searchSuggestions : Immutable.List(),
    searchTerm : ''
});

//let initialState = Immutable.Map({
//    suggestions : Immutable.List(),
//    markers : Immutable.Set(),
//
//})

export default function app(state = testState, action) {
    switch(action.type) {
        case SET_SEARCH_TERM:
            return state.set('searchTerm', action.term);

        case SET_SUGGESTIONS:
            return state.set('searchSuggestions', Immutable.List(action.suggestions));

        default:
            return state;
    }
}