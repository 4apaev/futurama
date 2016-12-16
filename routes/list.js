'use strict';

const parse = require('./parse')
const json = require('./json')

module.exports = list;

function list(req, res) {
  let { query, skip, limit } = parse(req.url, this.locals.limit)
  let total, cursor = this.collection.find(query).skip(skip).limit(limit);
  return cursor
            .count()
            .then(total => cursor.toArray()
                                  .then(result => json(res, { result, total }, 200)))
            .catch(err => json(res, err, 400));

}