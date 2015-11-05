import { ADD_EVENT, SET_SEARCH_TERM, SET_CENTER, SET_SUGGESTIONS, SET_EVENTS, SET_ZOOM } from '../constants/constants'
import Immutable from 'immutable'
import Event from 'classes/Event'

//beginning state of app
let testState = Immutable.Map({
    center : Immutable.List([47.608705, -122.34037]),
    zoom: 12,
    suggestions : Immutable.List(),
    searchTerm : '',
    events: Immutable.List([
        new Event({
            latitude: 47.608705,
            longitude: -122.34037,
            place_name: 'Pike Place',
            id: 'abadf',
            title: 'This bitch...',
            state: 'Washington'
        })]
    )
});

//let initialState = Immutable.Map({
//    suggestions : Immutable.List(),
//    markers : Immutable.Set(),
//
//})

export default function app(state = testState, action) {
    switch(action.type) {
        case ADD_EVENT:
            return state.update('events', (events) => {
                return events.push(new Event(action.event))
            });

        case SET_CENTER:
            return state.set('center', Immutable.List([action.lat, action.long]))

        case SET_SEARCH_TERM:
            return state.set('searchTerm', action.term);

        case SET_SUGGESTIONS:
            return state.set('suggestions', Immutable.List(action.suggestions));

        case SET_EVENTS:
            return state.set('events', Immutable.List(action.events));

        case SET_ZOOM:
            return state.set('zoom', action.zoom);

        default:
            return state;
    }
}