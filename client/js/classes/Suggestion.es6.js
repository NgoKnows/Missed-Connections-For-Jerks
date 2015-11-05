import Immutable from 'immutable'

let SuggestionRecord = Immutable.Record({
    address: '',
    factual_id: '',
    latitude: -1,
    locality: '',
    longitude: -1,
    name: '',
    postcode: '',
    region: ''
});

export default class Suggestion extends SuggestionRecord {
    constructor(event) {
        super(event);
    }

    //toJS() {
    //    const { id, ...other } = super.toJS();
    //    return other;
    //}
}