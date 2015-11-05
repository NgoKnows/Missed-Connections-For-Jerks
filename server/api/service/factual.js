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
    let queryKey = `/t/places-us query:${searchTerm.trim()}`;
    let found =  yield client.existsAsync(queryKey);

    if (found) {
        let value = yield client.getAsync(queryKey);
        return JSON.parse(value);
    } else {
        let apiResponse = yield factual.getAsync('/t/places-us',
            {q: searchTerm.trim(), limit: 5, sort: 'placerank:desc'})

        yield client.setAsync(queryKey, JSON.stringify(apiResponse[0].data));
        return apiResponse[0].data;
    }
}

//still untested
export function *getPlaceInfo(id) {
    let queryKey = `/t/places-us query:${searchTerm.trim()}`;
    let found = yield client.existsAsync(queryKey);

    if (found) {
        let value = yield client.getAsync(queryKey);
        return JSON.parse(value);
    } else {
        let apiResponse = yield factual.getAsync(`/t/places-us/${id}`)

        yield client.setAsync(queryKey, JSON.stringify(apiResponse[0].data));
        return apiResponse[0].data;
    }
}
