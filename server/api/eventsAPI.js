import * as eventService from './service/events'

export function *getEvents() {
    let events = yield eventService.getEvents();

    this.status = 200;
    this.body = {events};
}

export function *getEvent() {
    let id = this.params.id;
    let event = yield eventService.getEvent(id);

    this.status = 200;
    this.body = event;
}

export function *addEvent() {
    let event = this.request.body;

    yield eventService.addEvent((event));

    this.status = 200;
    this.body = 'Success!'
}
