import { ADD_EVENT, SET_CENTER, SET_SEARCH_TERM, SET_SUGGESTIONS, SET_EVENTS, SET_ZOOM } from '../constants/constants.es6'
import Immutable from 'immutable'
import request from 'superagent-bluebird-promise'

export function addEvent(event) {
    return {
        type: ADD_EVENT,
        event
    }
}

export function setCenter(lat, long) {
    console.log(lat, long)
    return {
        type: SET_CENTER,
        lat,
        long
    }
}

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

export function setEvents(events) {
    return {
        type: SET_EVENTS,
        events
    }
}

export function setZoom(zoom) {
    return {
        type: SET_ZOOM,
        zoom
    }
}

export function goToPlace(latitude, longitude){
    return (dispatch, getState) => {
        //dispatch(setCenter(latitude, longitude));
        //dispatch(setZoom(18));
        dispatch(addEvent({latitude, longitude}))
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
