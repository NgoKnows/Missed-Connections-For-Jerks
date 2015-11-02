import Immutable from 'immutable'

let EventRecord = Immutable.Record({
    id: 0,
    title: '',
    content: '',
    address: '',
    place_name: '',
    latitude: 0,
    longitude: 0,
    factual_id: '',
    user: ''
});

export default class Event extends EventRecord {
    constructor(event) {
        super(event);
    }
}