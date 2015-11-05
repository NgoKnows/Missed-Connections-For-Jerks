import Promise from 'bluebird'
import Factual from 'factual-api'
import redis from 'redis';

import { FACTUAL_KEY, FACTUAL_SECRET_KEY } from '../../secret'

Promise.promisifyAll(Factual.prototype);
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

let factual = new Factual(FACTUAL_KEY, FACTUAL_SECRET_KEY);
let client = redis.createClient();

export function *getSuggestions(searchTerm, locality = '') {
    let queryKey = `api:factual:places-us/{q:${searchTerm.trim().toLowerCase()},l:${locality}`;
    let found =  yield client.existsAsync(queryKey);

    if (found) {
        let value = yield client.getAsync(queryKey);
        return JSON.parse(value);
    } else {
        let apiResponse = yield factual.getAsync('/t/places-us',
            {q: searchTerm.trim().toLowerCase(), select:
                'address, factual_id, latitude, locality, longitude, name, postcode, region',
                limit: 5, sort: 'placerank:desc'
            })
        apiResponse = apiResponse[0].data

        yield client.setAsync(queryKey, JSON.stringify(apiResponse));
        return apiResponse;
    }
}

//still untested
export function *getPlaceInfo(id) {
    let queryKey = `api:factual:places-us#${id}`;
    let found = yield client.existsAsync(queryKey);

    if (found) {
        let value = yield client.getAsync(queryKey);
        return JSON.parse(value);
    } else {
        let apiResponse = yield factual.getAsync(`/t/places-us/${id}`, {select:
            'address, factual_id, latitude, locality, longitude, name, postcode, region'
        })
        apiResponse = apiResponse[0].data

        yield client.setAsync(queryKey, JSON.stringify(apiResponse));
        return apiResponse;
    }
}
