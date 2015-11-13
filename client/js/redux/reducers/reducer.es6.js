import { ADD_EVENT, SET_SEARCH_TERM, SET_CENTER, SET_SUGGESTIONS,
    SET_EVENTS, SET_ZOOM, START_LOADING, FINISH_LOADING, SHOW_AUTOCOMPLETE, HIDE_AUTOCOMPLETE,
    PAGE_FORWARD, PAGE_BACKWARD, OPEN_POPUP } from '../constants/constants'
import { combineReducers } from 'redux-immutablejs'
import { routeReducer } from 'redux-simple-router'

import Immutable from 'immutable'
import Event from 'classes/Event'

//beginning state of app
//Immutable.Map({
//    center : Immutable.List(),
//    zoom: 12,
//    suggestions : Immutable.List(),
//    searchTerm : '',
//    events: Immutable.List([])
//})

// Events
// --------------------------------------------------
let eventState = Immutable.List([
    new Event({
        latitude: 47.608705,
        longitude: -122.34037,
        place_name: 'Pike Place',
        id: 'abadf',
        title: 'This bitch...',
        state: 'Washington'
    })]
)

function events(state = eventState, action) {
    switch(action.type) {
        case ADD_EVENT:
            return events.push(new Event(action.event))

        case SET_EVENTS:
            return Immutable.List(action.events);

        default:
            return state;
    }
}


// Map
// --------------------------------------------------
let mapState = Immutable.Map({
    center : Immutable.List([47.608705, -122.34037]),
    zoom: 12
});

function map(state = mapState, action) {
    switch (action.type) {
        case SET_CENTER:
            return state.set('center', Immutable.List([action.lat, action.long]));

        case SET_ZOOM:
            return state.set('zoom', action.zoom);

        default:
            return state;
    }
}


// Search
// --------------------------------------------------
function searchTerm(state = '', action) {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return action.term;
        default:
            return state;
    }
}


// Suggestions
// --------------------------------------------------
function suggestions(state = Immutable.List(), action) {
    switch(action.type) {
        case SET_SUGGESTIONS:
            return Immutable.List(action.suggestions);

        default:
            return state;
    }
}


// Loading
// --------------------------------------------------
function loading(state = false, action) {
    switch (action.type) {
        case START_LOADING:
            return true;

        case FINISH_LOADING:
            return false;

        default:
            return state;
    }
}


// Loading
// --------------------------------------------------
const ui = combineReducers({
    showAutocomplete,
    feedPage,
    openPopup
})

function showAutocomplete(state = false, action) {
    switch (action.type) {
        case SHOW_AUTOCOMPLETE:
            return true;

        case HIDE_AUTOCOMPLETE:
            return false;

        default:
            return state;
    }
}

function feedPage(state = 1, action) {
    switch (action.type) {
        case PAGE_FORWARD:
            return state + 1;

        case PAGE_BACKWARD:
            return state - 1;

        default:
            return state
    }
}

function openPopup(state = '', action) {
    switch (action.type) {
        case OPEN_POPUP:
            return action.id
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    events,
    map,
    searchTerm,
    suggestions,
    loading,
    ui,
    routing: routeReducer
});

export default rootReducer;
