import Immutable from 'immutable'

let EventRecord = Immutable.Record({
    address: '',
    content: '',
    factual_id: '',
    id: -1,
    latitude: -1,
    locality: '',
    longitude: -1,
    place_name: '',
    title: '',
    user: ''
});

export default class Event extends EventRecord {
    constructor(event) {
        super(event);
    }

    toJS() {
        const { id, ...other} = super.toJS();
        return other;
    }
}