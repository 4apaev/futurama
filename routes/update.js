'use strict';

const is = require('is')
const json = require('./json')
const validate = require('./validate')
const ObjectID = require('mongodb').ObjectID


module.exports = update

function update(req, res) {
  let _id = ObjectID(req.url.split('/').pop())
  let { diff } = req.body;
  is.obj.assert(diff, '[ UPDATE ]: diff must be an object')

  let attrs = validate(diff)

  if (is.empty(attrs))
    return json(res, { message: 'nothing to update' }, 200);

  return this.collection
              .updateOne({ _id }, { $set: attrs })
              .then(result => json(res, { result, message: 'OK' }, 200))
              .catch(err => json(res, err, 400));
}