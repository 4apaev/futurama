'use strict';

module.exports = json

function json(res, payload, code=200) {

  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');

  if (payload instanceof Error) {
    let { message, stack, name } = payload
    return res.end(JSON.stringify({ message, stack, name }))
  }
  return res.end(JSON.stringify(payload))
}

