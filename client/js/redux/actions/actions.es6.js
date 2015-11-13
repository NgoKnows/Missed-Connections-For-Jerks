import { ADD_EVENT, SET_CENTER, SET_SEARCH_TERM, SET_SUGGESTIONS, SET_EVENTS,
    SET_ZOOM, START_LOADING, FINISH_LOADING, SHOW_AUTOCOMPLETE, HIDE_AUTOCOMPLETE,
    PAGE_FORWARD, PAGE_BACKWARD, OPEN_POPUP } from '../constants/constants.es6'

import { updatePath as updateRouterPath } from 'redux-simple-router'

import Immutable from 'immutable'
import request from 'superagent-bluebird-promise'

import Event from 'classes/Event'
import Suggestion from 'classes/Suggestion'


// Events
// --------------------------------------------------
export function addEvent(event) {
    return {
        type: ADD_EVENT,
        event
    }
}

export function setEvents(events) {
    return {
        type: SET_EVENTS,
        events
    }
}

export function addEvent(event) {
    return (dispatch, getState) => {
        request
            .post('/api/events')
            .send(new Event(event).toJS())
            .then((res) => dispatch(addEvent(new Event(event))))
    }
}

export function fetchEvents() {
    return (dispatch, getState) => {
        request
            .get('/api/events')
            .then((res) => dispatch(setEvents(res.body.events.map((event) => new Event(event)))))
    }
}


// Map
// --------------------------------------------------
export function setCenter(lat, long) {
    return {
        type: SET_CENTER,
        lat,
        long
    }
}

export function setZoom(zoom) {
    return {
        type: SET_ZOOM,
        zoom
    }
}

export function goToPlace(place, id) {
    return (dispatch, getState) => {
        const { latitude, longitude } = place;

        dispatch(setCenter(latitude, longitude));
        dispatch(setZoom(17));

        if(id) {
            dispatch(openPopup(id));
        }
    }
}


// Search
// --------------------------------------------------
export function setSearchTerm(term) {
    return {
        type: SET_SEARCH_TERM,
        term
    }
}


// Suggestions
// --------------------------------------------------
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

            if (searchTerm.length < 1) {
                dispatch(setSuggestions([]));
            }
            //only make api call if still searching for same term
            else if (currentSearchTerm === searchTerm) {
                console.log('make api call')
                request
                    .get(`/api/suggestions/${currentSearchTerm}`)
                    .then((res) => dispatch(setSuggestions(
                        Immutable.List(res.body.map((suggestion) => new Suggestion(suggestion))))))
            }
        }, 500)
    }
}

// Loading
// --------------------------------------------------
export function startLoading() {
    return {
        type: START_LOADING
    }
}

export function finishLoading() {
    return {
        type: FINISH_LOADING
    }
}

// UI
// --------------------------------------------------
export function showAutocomplete() {
    return {
        type: SHOW_AUTOCOMPLETE
    }
}

export function hideAutocomplete() {
    return {
        type: HIDE_AUTOCOMPLETE
    }
}

export function pageForward() {
    return {
        type: PAGE_FORWARD
    }
}

export function pageBackward() {
    return {
        type: PAGE_BACKWARD
    }
}

export function openPopup(id) {
    return {
        type: OPEN_POPUP,
        id
    }
}

// Router
// --------------------------------------------------
export const updatePath = updateRouterPath;

// Thunks
// --------------------------------------------------
export function fetchPlaceInfo() {
    return (dispatch, getState) => {
        request
            .get(`/api/business/${place.factual_id}`)
            .send(new Event(event).toJS())
            .then((res) => console.log(res))
    }
}
