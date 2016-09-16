'use strict';
global.log = console.log.bind(console)

const { PORT, MAXAGE, APPNAME, COLLECTION, DBHOST, BASEDIR, ICON, TERMS } = require('./config.json')
const Mongo   = require('mongodb').MongoClient;
const server  = require('devserver');


// default middleware
const { body, brws, favicon, logger, statiq, finish } = require('devserver/middleware')

// app middleware
const { distinct, search, find } = require('./routes/db')(COLLECTION)
const home = require('./routes/home')

// create app
const app = server()

// set routes
app.use(logger('$statusCode $method $url'));
app.post(body);

app.get('/',               home);
app.get('/favicon.ico',    favicon(ICON, MAXAGE));

app.get(/src\/.*\.js$/,  brws(BASEDIR, APPNAME));
app.get(/futurama\/character\/\w+/,  find);
app.get(/futurama\/distinct\/\w+/,  distinct);
app.post('/futurama',  search);

app.get(statiq(BASEDIR));


// init
Mongo.connect(DBHOST).then(db => {
  log('Connected to ', DBHOST);

  const getFilter = name => db.collection(COLLECTION).distinct(name).then(value => ({ name, value }))

  Promise.all(TERMS.map(getFilter)).then(terms => {
    app.db = db
    app.locals = { APPNAME, terms }
    app.listen(PORT, finish);
    log(APPNAME, `running on localhost:`, PORT);
  })


})





// app.post(/^\/view\//,      pugify);