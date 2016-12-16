'use strict';

const Mongo = require('mongodb').MongoClient;

module.exports = ({ HOST, LABEL, TERMS }) => Mongo.connect(HOST).then(db => {
  const distinct = name =>
    db.collection(LABEL)
      .distinct(name)
      .then(value => ({ name, value }));
  return Promise.all(TERMS.map(distinct)).then(terms => ({ db, terms }))
})



// init().then(({ db, terms }) => {
//   app.db = db
//   app.locals = conf.locals
//   app.locals.terms = terms
//   app.listen(conf.PORT);
//   log(`running on localhost:`, conf.PORT);
// })