'use strict';

module.exports = resolve

const { assign } = Object
const { stringify } = JSON

function resolve(res, opts={}) {

  res.statusCode = opts.code||200;
  res.setHeader('Content-Type', 'application/json');

  return result => {
    opts.result = result
    return res.end(stringify(opts))
  }
}


