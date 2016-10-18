'use strict';

const ObjectID = require('mongodb').ObjectID
const CNAME = require(`${ process.cwd() }/config.json`).DB.collection

exports.find = find;
exports.search = search;

function search(req, res) {
  let { query, limit=100, skip=0 } = req.body;
  let cursor = this.db.collection(CNAME).find(query).skip(skip).limit(limit);
  return cursor.count().then(total => cursor.toArray().then(resolve(res, total)));
}

function find(req, res) {
  let id = ObjectID(req.url.split('/').pop())
  return this.db.collection(CNAME).findOne(id).then(resolve(res))
}

function resolve(res, total=1) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  return result => res.end(JSON.stringify({ result, total }))
}