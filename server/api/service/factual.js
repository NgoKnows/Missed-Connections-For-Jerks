import Promise from 'bluebird'
import Factual from 'factual-api'
import { FACTUAL_KEY, FACTUAL_SECRET_KEY } from '../../secret'

Promise.promisifyAll(Factual.prototype);

let factual = new Factual(FACTUAL_KEY, FACTUAL_SECRET_KEY);

export function getSuggestions(searchTerm) {
    return factual.getAsync('/t/places-us', {q: searchTerm.trim(), limit: 5, sort: 'placerank:desc'})
        .then((res) => res[0].data)
        .catch((error) => console.log(error))
}