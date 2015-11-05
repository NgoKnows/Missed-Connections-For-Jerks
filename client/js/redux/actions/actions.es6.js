import { ADD_EVENT, SET_CENTER, SET_SEARCH_TERM, SET_SUGGESTIONS, SET_EVENTS, SET_ZOOM } from '../constants/constants.es6'
import Immutable from 'immutable'
import request from 'superagent-bluebird-promise'

import Event from 'classes/Event'
import Suggestion from 'classes/Suggestion'

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

export function goToPlace(place){
    return (dispatch, getState) => {
        const { latitude, longitude, name, factual_id, region } = place;
        dispatch(setCenter(latitude, longitude));
        dispatch(setZoom(17));

        let event = {
            title: 'This bitch really...',
            content: 'Yeah, I was at Pike Place and this guy was being a total dick',
            address: '12322 SE St',
            place_name: 'Pike Place',
            locality: '',
            latitude: 47.608705,
            longitude: -122.34037,
            factual_id: '',
            user: 'MyUsername'
        };

        request
            .post('/api/events')
            .send(new Event(event).toJS())
            .then((res) => console.log(res))
        //dispatch(addEvent({id: factual_id, place_name: name, title: 'New event!', latitude, longitude, state: region}))
    }
}

export function addEvent(event) {
    return (dispatch, getState) => {
        request
            .post('/api/events')
            .send(new Event(event).toJS())
            .then((res) => console.log(res))
    }
}

export function fetchEvents() {
    return (dispatch, getState) => {
        request
            .get('/api/events')
            .then((res) => dispatch(setEvents(res.body.events.map((event) => new Event(event)))))
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
