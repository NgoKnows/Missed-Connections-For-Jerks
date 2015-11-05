import r from 'rethinkdb'
import config from '../config.json'

function connect() {
    return r.connect(config);
}

export function liveUpdates(io) {
    console.log('Setting up live updates...');
    connect()
    .then((conn) => {
        r
            .table('events')
            .changes()
            .run(conn, (err, cursor) => {
                console.log('Listening for changes...')
                cursor.each((err, change) => {
                    console.log('Change detected', change)
                    io.emit('event-change', change)
                })
        })
    })
}

export function getEvents() {
    return connect()
        .then((conn) => {
            return r
                .table('events')
                .run(conn)
                .then((cursor) => cursor.toArray())
        })
}

export function getEvent(id) {
    return connect()
        .then((conn) => {
            return r
                .table('events')
                .get(id)
                .run(conn)
        })
}

export function addEvent(event) {
    return connect()
        .then((conn) => {
            return r
                .table('events')
                .insert(event)
                .run(conn)
        })
}
