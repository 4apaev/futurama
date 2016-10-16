'use strict';
global.log = console.log.bind(console)

const conf = require('./config.json');

const Mongo   = require('mongodb').MongoClient;
const server  = require('devserver');
const { body, brws, logger, statiq } = require('devserver/middleware')
const { search, find } = require('./routes/db')
const home = require('./routes/home')

const app = server()
app.locals = { ICON: conf.ICON, APPNAME: conf.APPNAME, count: conf.DB.count, terms: [] }

app.use(logger('$statusCode $method $url'));
app.post(body);

app.get('/', home);
app.get(/src\/.*\.js$/,  brws());
app.get(/characters\/\w+/, find);
app.post('/characters',  search);

app.get(statiq());

Mongo.connect(conf.DB.host).then(db => {

  app.db = db
  const { terms, collection, host } = conf.DB;
  log('Connected to ', host);
  const distinct = name => db.collection(collection).distinct(name).then(value => ({ name, value }))

  db.collection(collection).count().then(count => app.locals.count = +count)

  Promise.all(terms.map(distinct)).then(init)
})

function init(terms) {
  app.locals.terms = terms
  app.listen(conf.PORT);
  log(`running on localhost:`, conf.PORT);
}