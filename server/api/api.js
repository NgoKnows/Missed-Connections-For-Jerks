import * as eventService from './service/events'
import * as factualService from './service/factual'

export function *getSuggestions() {
    let searchTerm = this.params.searchterm;
    var startTime = new Date();
    let suggestions = yield factualService.getSuggestions(searchTerm);
    var endTime = new Date();
    console.log(endTime - startTime);
    this.status = 200;
    this.body = suggestions;
}
