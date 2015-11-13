import Immutable from 'immutable'
import moment from 'moment'

let EventRecord = Immutable.Record({
    address: '',
    content: '',
    date: moment(),
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
        const { id, date, ...other} = super.toJS();
        return other;
    }
}