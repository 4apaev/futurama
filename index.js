'use strict';

global.log = console.log.bind(console);

const server  = require('devserver');
const { body, brws, logger, statiq } = require('devserver/middleware');
const { PORT, LOCALS, MONGO } = require('./config.json');

const home = require('./routes/home');
const list = require('./routes/list');
const find = require('./routes/find');
const update = require('./routes/update');
const connect = require('./routes/connect');

const js = /^\/src\/.*\.js$/;
const char = /^\/characters\/\w+$/;
const term = /^\/term\/\w+$/;
const app = server();

app
  .use(logger('$statusCode $method $url'))
  .put(body)
  .get('/', home)
  .get('/list', list)
  .get(char, find)
  .put(char, update)
  .get(js,  brws())
  .get(statiq());


connect(MONGO).then(({ db, terms }) => {
  app.db = db
  app.locals = LOCALS;
  app.locals.TERMS = terms
  app.collection = db.collection(MONGO.LABEL)
  app.listen(PORT);
  log(`running on localhost:`, PORT);
});