import Promise from 'bluebird'
import Factual from 'factual-api'
import redis from 'redis';

import { FACTUAL_KEY, FACTUAL_SECRET_KEY } from '../../secret'

Promise.promisifyAll(Factual.prototype);
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

let factual = new Factual(FACTUAL_KEY, FACTUAL_SECRET_KEY);
let client = redis.createClient();

export function *getSuggestions(searchTerm) {
    let queryKey = `/t/places-us query:${searchTerm.trim}`;

    return yield client.existsAsync(queryKey)
    .then(found => {
        if (found) {
            return client.getAsync(queryKey)
            .then(res => {
                return JSON.parse(res)
            });
        } else {
            return factual.getAsync('/t/places-us', {q: searchTerm.trim(), limit: 5, sort: 'placerank:desc'})
            .then(res => {
                client.setAsync(`/t/places-us query:${searchTerm.trim}`, JSON.stringify(res[0].data))
                return res[0].data
            })
            .catch((error) => console.log(error))
        }
    })
}

export function getPlaceInfo(id) {
    return factual.getAsync(`/t/places-us/${id}`)
        .then((res) => res[0].data)
        .catch((error) => console.log(error))
}