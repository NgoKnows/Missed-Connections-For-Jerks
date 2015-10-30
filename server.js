'use strict';
import path from 'path'

import Koa from 'koa'
import router from 'koa-router'
import serve from 'koa-static'
import bodyParser from 'koa-body'

import r from 'rethinkdb'
import http from 'http'
import SocketIO from 'socket.io'
import webpack from 'webpack'

import * as eventService from './server/api/service/events'
import * as api from './server/api/api'
import config from './webpack.config'

const app = Koa();
const myRouter = router();
const myBodyParser = bodyParser();
const compiler = webpack(config);
const httpServer = http.Server(app.callback());
const port = process.env.PORT || 8000;

let io = SocketIO(httpServer)

//serve up new builds
app.use(require('koa-webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

//spit out new builds
app.use(require('koa-webpack-hot-middleware')(compiler));

myRouter
    .get('/api/suggestions/:searchterm', api.getSuggestions)

app
    .use(serve(path.resolve('client')))
    .use(myRouter.routes())
    .use(myRouter.allowedMethods());

httpServer.listen(port, () => {
    console.log('App is listening on port', port);
});

//sets up live updating
//eventService.liveUpdates(io);

