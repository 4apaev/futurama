'use strict';

const ObjectID = require('mongodb').ObjectID

const resolve = res => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  return result => res.end(JSON.stringify({ result }))
}

module.exports = cname => {

  function search(req, res) {
    let { query, limit=100, skip=0 } = req.body;
    return this.db.collection(cname)
                  .find(query)
                  .skip(skip)
                  .limit(limit)
                  .toArray()
                  .then(resolve(res));
  }

  function find(req, res) {
    let id = ObjectID(req.url.split('/').pop())
    return this.db.collection(cname)
                .findOne(id)
                .then(resolve(res))
  }

  function distinct(req, res) {
    let prop = req.url.split('/').pop()
    return this.db.collection(cname).distinct(prop).then(resolve(res))
  }

  function count(req, res) {
    return this.db.collection(cname).count().then(resolve(res))
  }
  return { distinct, search, find, count }
}