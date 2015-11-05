import * as factualService from './service/factual'

export function *getSuggestions() {
    let searchTerm = this.params.searchTerm;
    let suggestions = yield factualService.getSuggestions(searchTerm);

    this.status = 200;
    this.body = suggestions;
}

export function *getPlaceInfo() {
    let id = this.params.id;
    let place = yield factualService.getPlaceInfo(id)

    this.status = 200;
    this.body = place;
}