'use strict';

const json = require('./json')
const { ObjectID } = require('mongodb');

module.exports = find

function find(req, res) {
  let id = ObjectID(req.url.split('/').pop())
  return this.collection.findOne(id)
                        .then(result => json(res, { result }, 200))
                        .catch(err => json(res, err, 400));
}
